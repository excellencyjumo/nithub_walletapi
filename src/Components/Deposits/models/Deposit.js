const {connection} = require("../../../database");
const { v4: uuidv4 } = require('uuid');

class Deposit{
    constructor(amount, walletId) {
        this.id = uuidv4().toString();
        this.amount = amount;
        this.wallet = walletId;
        this.createdAt = new Date();
    }

    save(){
        const statement = `INSERT INTO deposits (id, amount, wallet, createdAt) 
                            VALUES (?, ?, ?, ?)`;
        const values = [this.id, this.amount, this.wallet, this.createdAt];

        return new Promise((resolve, reject) => {
            connection.query(statement, values, (err, results) => {
                if(err){
                    reject(err);
                }else{
                    resolve(results.insertId)
                }
            })
        })
    }

    static getWalletDeposits(id){
        const statement = "SELECT * FROM deposits WHERE wallet = ?";
        return new Promise((resolve, reject) => {
            connection.query(statement, id, (err, result) => {
                if (err){
                    reject(err);
                }else if (result.length === 0){
                    resolve(null);
                }else {
                    resolve(result);
                }
            })
        })
    }

    static getDeposit(walletID, depositID){
        const statement = "SELECT * FROM deposits WHERE wallet = ? AND id = ?";
        const values = [walletID, depositID];

        console.log(values);
        return new Promise((resolve,reject) => {
            connection.query(statement, values, (err, result) => {
                if (err){
                    reject(err);
                }else if (result.length === 0){
                    resolve(null);
                }else {
                    resolve(result);
                }
            })
        })
    }
}

module.exports = Deposit;