const {wallets}=require("../database/data")
const db = require("../database/database")
const id=1001;
class Wallet {
  constructor(currency) {
    this.id = id++;
    this.currency = currency;
    this.amount = 0;
  }

  toJSON() {
    return {
      id: this.id,
      currency:this.currency,
      amount:this.amount
    };
  }

  save(id,amount) {
    const query = `UPDATE wallets SET amount="${amount}" WHERE id="${id}"`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  }

  static create(currency) {
    const wallet = new Wallet(currency);
    const query = `INSERT INTO wallets VALUES ("${wallet.currency}","${0}")`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          wallet.id = results.insertId;
          resolve(wallet);
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

  static getAll() {
    const query = `SELECT * FROM wallets`;
    return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          const models = results.map((res) => {
            const wallet = new Wallet(res.currency);
            wallet.id = res.id;
            wallet.amount=res.amount;
            return wallet;
          });
          resolve(models);
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