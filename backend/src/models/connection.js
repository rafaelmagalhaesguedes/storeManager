const mysql = require('mysql2/promise');

// Config MySQL
const mysqlConfig = {
  host: process.env.MYSQL_HOSTNAME || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'StoreManager',
};

// Create connection pool
const connection = mysql.createPool(mysqlConfig);

module.exports = connection;