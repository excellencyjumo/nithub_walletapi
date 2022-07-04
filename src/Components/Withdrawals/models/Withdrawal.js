const { v4: uuidv4 } = require('uuid');
const {connection} = require("../../../database");

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

    static getWalletWithdrawals(id){
        const statement = "SELECT * FROM withdrawals WHERE wallet = ?";

        return new Promise((resolve, reject) => {
            connection.query(statement, id, (err, result) => {
                if (err){
                    reject(err);
                }else if (result.length === 0){
                    resolve(null);
                }else {
                    resolve(result);
                }
            });
        });
    }

    static getWithdrawalByID(wallet, withdrawalID){
        const statement = "SELECT * FROM withdrawals WHERE wallet = ? AND  id = ?";
        const values = [wallet, withdrawalID];

        return new Promise((resolve, reject) => {
            connection.query(statement, values, (err, result) => {
                if (err){
                    reject(err);
                }else if (result.length === 0){
                    resolve(null);
                }else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Withdrawal;