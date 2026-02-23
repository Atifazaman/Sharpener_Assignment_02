const fs = require('fs');

const requestHandler=((req,res)=>{
const url=req.url
   const method=req.method
    if(req.url==='/')
    {  
         fs.readFile('FormValue.txt', (err, data) => {

            let username = '';

            if (!err) {
                username = data.toString();
            }

            res.setHeader('Content-Type', 'text/html');

            res.end(`
                <h2>Entered Name: ${username}</h2>

                <form action="/message" method="POST">
                    <label>Name:</label>
                    <input type="text" name="username">
                    <button type="submit">Add</button>
                </form>
            `);
        });
    }else{
        if(url === '/message' && method === 'POST'){
            res.setHeader('Content-type','text/html');

            let dataChunks=[]
            req.on('data',(chunks)=>{
                console.log(chunks)
                dataChunks.push(chunks)
            })
            req.on('end',()=>{
                let combinedBuffer=Buffer.concat(dataChunks)
                console.log(combinedBuffer.toString())
                let value=combinedBuffer.toString().split("=")[1]

                console.log(value)

                fs.writeFile('FormValue.txt',value,(err)=>{
                    res.statusCode=302 //redirected
                    res.setHeader('Location','/')
                    res.end()
                })
            })
        }
    }
})
module.exports=requestHandler
// different ways are: 
// 1) module.exports={requestHandler,another function}  
// 2)module.exports={handler:requestHandler,newFunc:another function}  
// 3)module.exports.handler=requestHandler
// 4)module.exports.handler=requestHandler