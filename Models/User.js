const { users } = require('../db/data');
const { userdb } = require('../database/database')

let userId = 0;
class User {
  constructor(firstname, lastname, email) {
    this.id = userId++;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.wallets = [];
  }

  toJSON() {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      wallets: this.wallets
    };
  }

  static getByEmail(email) {
    return users.find((user) => user.email === email);
  }

  static getByID(id) {
    return users.find((user) => user.id === id);
  }

  static findByFirstName(firstname) {
    return users.find((user) => user.firstname === firstname);
  }
}

module.exports = User;