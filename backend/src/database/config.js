const __knex = require('knex')

const config = require('../../knexfile.js')

let knex = null
if (process.env.NODE_ENV === "test") {
    knex = __knex(config.test)
} else {
    knex = __knex(config.development)
}

module.exports = knex
