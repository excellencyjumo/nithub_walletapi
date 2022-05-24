const Wallet = require('Wallet')
class User{
    constructor(userId,fName,lName,email){
        this.userId=userId;
        this.fName=fName; // firstname
        this.lName=lName; // lastname
        this.email=email;
        this.dor=new Date().toDateString(); //date of registration 
    }
    
}