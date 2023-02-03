const mysql = require('mysql2/promise');

require('dotenv').config()

const connection = async () => {
  
  const db = await mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: process.env.PASSWORD, //works with require('dotenv.').config()
      database: 'oscorp_db'
    },
    console.log(`Connected to the oscorp_db database.
  “Altering the future, from the cell to the superstructure.”`)
  );
  return db
};



module.exports = connection();