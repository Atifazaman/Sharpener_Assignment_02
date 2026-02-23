const http=require('http')
const fs = require('fs');
const server= http.createServer((req,res)=>{
   const url=req.url
   const method=req.method
    if(req.url==='/')
    {  
        res.setHeader('Content-Type','text/html')

        res.end(
            `
            <form action="/message" method="POST">
            <label>Name:</label>
            <input type="text" name="username"></input>
            <button type="submit">Add</button> 
            </form>
            `
        );
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

server.listen(3000,()=>{
console.log("Server is running")
})