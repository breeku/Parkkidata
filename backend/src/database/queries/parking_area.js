const knex = require("../config")

// Database queries related to parking data

const getParkingAreas = async () => {
    return await knex.select().table("parking_area")
}

module.exports = { getParkingAreas }
