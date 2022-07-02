const { connection } = require('../database/index');
const { v4: uuidv4 } = require('uuid');

class Wallet {
  constructor(currency, user) {
    this.id = uuidv4().toString();
    this.currency = currency;
    this.amount = 0.000;
    this.user = user;
  }


  toJSON() {
    return {
      id: this.id,
      currency:this.currency,
      amount:this.amount
    };
  }

  static transform(array){
    return array.map(value => {
      const wallet = new Wallet(value.currency, value.user_id);
      wallet.id = value.id;
      wallet.amount = value.amount;
      return wallet;
    })
  }

  updateById(){
    const statement = `UPDATE wallets SET amount = ? WHERE id = ? `;
    const values = [this.amount, this.id];

    return new Promise((resolve, reject) => {
      connection.query(statement, values, async (err, result) => {
        if (err){
          reject(err);
        }else{
          const wallet = await Wallet.findById(this.id);
          resolve(wallet);
        }
      })
    })
  }

  save() {
    const statement  = `INSERT INTO wallets (id, currency, amount, user_id) 
                        VALUES (?, ?, ?, ?)`;
    const values = [this.id, this.currency, this.amount, this.user];


    return new Promise((resolve, reject) => {
      connection.query(statement, values,  async (err, results) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const wallet = await Wallet.findById(this.id);
          resolve(wallet);
        }
      });
    });
  }

  static findById(id){
    const statement = "SELECT * FROM wallets WHERE id = ?";

    return new Promise((resolve, reject) => {
      connection.query(statement, id, (err, result) => {
        if (err){
          console.log(err);
          reject(err);
        }else if(result.length === 0){
          resolve(null);
        }else {
          const wallet = this.transform(result);
          resolve(wallet[0]);
        }
      });
    });
  }

  static getByCurrency(id) {
    const query = `SELECT * FROM wallets WHERE id="${id}"`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            resolve(null);
          } else {
            const res = results[0];
            const wallet = new Wallet(res.currency);
            wallet.id = res.id;
            resolve(wallet);
          }
        }
      });
    });
  }

  static findByUserId(id) {
    const statement = `SELECT * FROM wallets where user_id = ?`;
    return new Promise((resolve, reject) => {
      connection.query(statement, id, (err, results) => {
        if (err) {
          reject(err);
        } else if(results.length === 0){
          resolve(null);
        }else {
          const wallets = this.transform(results);
          resolve(wallets);
        }
      });
    });
  }

  static deleteByID(id) {
    const walletIndex = wallets.findIndex((wallet) => wallet.id === id);
    if (walletIndex === -1) {
      return false;
    }
    wallets.splice(walletIndex, 1);
    return true;
  }
}

module.exports = Wallet;