const knex = require('knex')
const config = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "ecommerce",
  },
  pool: { min: 0, max: 7 },
}

const configSQLite3 = {
  client: 'sqlite3',
  connection: { filename: './ecommerce.sqlite' },
  useNullAsDefault: true
}

const sqliteConnection = knex(configSQLite3)
const mysqlConnection = knex(config)
module.exports = {mysqlConnection, sqliteConnection}