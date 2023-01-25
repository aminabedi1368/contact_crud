var global = require('../../variable');
const Pool = require('pg').Pool
const pool = new Pool({
  user: global.POSGRES.DB_USER,
  host: global.POSGRES.DB_HOST,
  database: global.POSGRES.DB_NAME,
  password: global.POSGRES.DB_PASS,
  port: global.POSGRES.DB_PORT
})

module.exports = pool;
