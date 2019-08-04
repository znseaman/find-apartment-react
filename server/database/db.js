const Pool = require("pg").Pool;
const db_config = require("../secrets/db_config");
const pool = new Pool(db_config);

module.exports = pool;
