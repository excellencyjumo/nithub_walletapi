const express=require('express');

server=express();

const port=8080;
server.listen(port,()=>{
    console.log(`server running on port {port}`)
})

