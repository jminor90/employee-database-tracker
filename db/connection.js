const mysql = require('mysql2');

require('dotenv').config()

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD, //works with require('dotenv.').config()
    database: 'oscorp_db'
  },
  console.log(`Connected to the oscorp_db database.
“Altering the future, from the cell to the superstructure.”`)
);

module.exports = db;