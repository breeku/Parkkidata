const knex = require('../config')

// Database queries related to parking data

const getParkingAreas = async () => {
    return await knex.from('parking_area').select()
}

const getFilteredParkingAreas = async (operator, capacity) => {
    const expression = operator === 'more' ? '>' : operator === 'less' ? '<' : '='

    return await knex
        .from('parking_area')
        .select()
        .where('capacity_estimate', expression, capacity) // creates sql query such as `select * from "parking_area" where "capacity_estimate" > 10`
}

module.exports = { getParkingAreas, getFilteredParkingAreas }
