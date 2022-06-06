const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "o817O714475",
  database: "walletdb",
  port: "3306"
});

module.exports = connection;