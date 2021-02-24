const __knex = require('knex')

const config = require('../../knexfile.js')

const knex = __knex(config.development)

module.exports = knex
