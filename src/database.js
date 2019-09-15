const mysql = require('mysql2/promise')
const config = require('./config/auth.json')

const connection = mysql.createPool({
  host: config.db_host,
  user: config.db_user,
  password: config.db_password,
  database: config.db_database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection
