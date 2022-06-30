const { v4: uuidv4 } = require('uuid');
const {connection} = require("../database");

class Withdrawal {

    constructor(amount, walletId) {
        this.id = uuidv4().toString();
        this.amount = amount;
        this.wallet = walletId;
        this.createdAt = new Date();
    }

    save(){
        const statement = `INSERT INTO withdrawals (id, amount, wallet, createAt) 
                            VALUES (?,?,?,?)`;
        const values = [this.id, this.amount, this.wallet, this.createdAt];

        return new Promise((resolve, reject) => {
            connection.query(statement, values, (err, results) => {
                if (err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
        });
    }
}

module.exports = Withdrawal;