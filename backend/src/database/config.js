const { Pool } = require("pg")
const pool = new Pool({
    user: process.env.DB.USER,
    host: process.env.DB.HOST,
    database: process.env.DB_NAME,
    password: process.env.DB.PASSWORD,
})

pool.on("error", (err, client) => {
    console.error("Unexpected error on idle client", err)
    process.exit(-1)
})

/* Create tables here
;(async () => {
    const example = await pool.query('SELECT * FROM users WHERE id = $1', [1])
  })().catch(err =>
    setImmediate(() => {
      throw err
    })
  )
*/

module.exports = pool
