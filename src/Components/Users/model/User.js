const { connection } = require('../../../database')
const { v4: uuidv4 } = require('uuid');
const { compare } = require('bcrypt');
const {sign} = require("jsonwebtoken");
const {JWT} = require("../../../config");

class User {

  constructor(firstname, lastname, email, password) {
    this.id = uuidv4().toString();
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }


  comparePassword(password){
    return compare(password, this.password);
  }

  toJSON() {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      token: this.token
    };
  }


  static transform(array){
    return array.map(value => {
      const user = new User(value.firstname, value.lastname, value.email, value.password);
      user.id = value.id;
      return user;
    })
  }

  generateAuthToken(){
    const token = sign({ id: this.id }, JWT.ACCESS_TOKEN_SECRET, {
      expiresIn: JWT.tokenLifeSpan
    });

    this.token = token;
    return token;
  }

  save(){
    const statement = `INSERT INTO users (id, firstname, lastname, email, password) 
                       VALUES (?, ?, ?, ?, ?)`;
    const values = [this.id, this.firstname, this.lastname, this.email, this.password];

    return new Promise((resolve, reject) => {
      connection.query(statement, values, async (err, results) => {
        if (err){
          console.log(err);
          reject(err);
        }else{
          let user = await User.findByFirstName(this.firstname);
          const result = User.transform(user);
          resolve(result);
        }
      });
    });

  }

  static getByEmail(email) {
    const statement = "SELECT * FROM users WHERE email = ?";

    return new Promise((resolve, reject) => {
      connection.query(statement, email, (err, results) => {
        if (err){
          console.log(err);
          reject(err);
        }else if (results.length === 0){
          resolve(null);
        }else{
          const result = User.transform(results);
          resolve(result);
        }
      })
    })
  }

  static getByID(id) {
    return users.find((user) => user.id === id);
  }

  static findByFirstName(firstname) {
    const statement = "SELECT * FROM users WHERE firstname = ?";

    return new Promise((resolve, reject) => {
      connection.query(statement, firstname, (err, results) => {
        if (err) {
          console.log(err);
          reject(err);
        } else if (results.length === 0) {
          resolve(null)
        } else {
          resolve(results);
        }
      });
    })
  }

  static findById(id)
  {
    const statement = "SELECT * FROM users WHERE id = ?";

    return new Promise((resolve, reject) => {
      connection.query(statement, id, (err, results) => {
        if (err) {
          console.log(err);
          reject(err);
        } else if (results.length === 0) {
          resolve(null)
        } else {
          resolve(results);
        }
      });
    })

  }


}

User.prototype.toJSON();
User.prototype.comparePassword;

module.exports = User;