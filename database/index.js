const mysql = require("mysql2");
const { db } = require('../config')

const connection = mysql.createConnection({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.name,
  port: db.port
});

const connectToDB = async function() {
  await connection.connect();
}

module.exports = {
  connection,
  connectToDB
};