const { withdraws } = require("../database/data")

class Withdraw{
    constructor(id,amount){
        this.walletid=id;
        this.amount=amount;
    }
    
}
const { transfers } = require("../database/data")

class Transfer{
    constructor(sourceId,targetId,amount){
        this.sourceWallet=sourceId;
        this.targetWallet=targetId;
        this.amount=amount;
    }
    
}
const { deposits } = require("../database/data")

class Deposit{
    constructor(id,amount){
        this.walletid=id;
        this.amount=amount;
    }
    
}