const sql = require("mysql2");

const pool = sql.createPool({
  host: "127.0.0.1",
  // if above doesn't work try host: "localhost"
  user: "userName",
  database: "databaseName",
  password: "password",
});

module.exports = pool.promise();
