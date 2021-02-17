const knex = require("../config")

// Database queries related to parking data

const getParkingAreas = async () => {
    return await knex.from('parking_area').select()
}



module.exports = { getParkingAreas }
