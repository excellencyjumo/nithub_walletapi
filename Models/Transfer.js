const { v4: uuidv4 } = require('uuid');
const {connection} = require("../database");

class Transfer{

    constructor(amount,rate, sourceWallet, destinationWallet) {
        this.id = uuidv4().toString();
        this.amount = amount;
        this.sourceWallet = sourceWallet;
        this.destinationWallet = destinationWallet;
        this.conversionRate = rate;
        this.createdAt = new Date();
    }

    save(){
        const statement = `INSERT INTO transfers (id, amount, source_wallet, destination_wallet, source_wallet_currency, destination_wallet_currency,conversion_rate) 
                            VALUES (?,?,?,?,?,?,?)`;
        const values = [
            this.id,
            this.amount,
            this.sourceWallet.id,
            this.destinationWallet.id,
            this.sourceWallet.currency,
            this.destinationWallet.currency,
            this.conversionRate
        ];

        return new Promise((resolve, reject) => {
            connection.query(statement, values, (err, result) => {
                if (err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Transfer;