const { transfers } = require("../database/data")

class Transfer{
    constructor(sourceId,targetId,amount){
        this.sourceWallet=sourceId;
        this.targetWallet=targetId;
        this.amount=amount;
    }
    
}