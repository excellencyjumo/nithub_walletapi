const User = require('../Models/User') 
const {users} =require('../database/data')

class UserController{
    constructor(){}

    createUser(req,res){
        const body = req.body;
        const newUser = new User(body.userId,body.fName,body.LName)
        users.push(newUser);
        res.send({
            status:201,
            
        }
        )
    }
}