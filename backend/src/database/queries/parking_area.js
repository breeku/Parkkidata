const knex = require("../config")

// Database queries related to parking data

const getParkingAreas = async () => {
    return await knex.from('parking_area').select()
}


const getParkingHistoryByUid = async (uid) => {
    return await knex.from('parking_area_statistics').select().where({uid})
}


module.exports = { getParkingAreas,getParkingHistoryByUid }
