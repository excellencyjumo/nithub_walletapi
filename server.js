const express=require('express');
const UserController = require('./Controllers/UserController');
server=express();


const userController= new UserController();
server.post('./user',userController.createUser);


const port=8080;
server.listen(port,()=>{
    console.log(`server running on port %s`,port)
})

