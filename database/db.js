const Pool = require('pg').Pool
const {
  DB_USER: user,
  DB_HOST: host,
  DB_NAME: database,
  DB_PASSWORD: password,
  DB_PORT: port,
} = process.env
const pool = new Pool({
  user,
  host,
  database,
  password,
  port: Number(port),
})

module.exports = pool
