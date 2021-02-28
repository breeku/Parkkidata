const knex = require('../config')

// Database queries related to parking data

const getParkingAreas = async () => {
    return await knex.from('parking_area').select()
}

const getParkingAreasByArray = async uids => {
    return await knex.from('parking_area').select().whereIn('uid', uids)
}

const getParkingHistoryByUid = async (uid, limit) => {
    return await knex
        .from('parking_area_statistics')
        .select()
        .where({ uid })
        .orderBy('id', 'desc')
        .limit(limit)
}

const getPopularParkingAreas = async (hours, limit) => {
    const toDate = new Date()
    const fromDate = new Date(
        new Date().setDate(Math.floor(toDate.getDate() - hours / 24)),
    )

    const { rows } = await knex.raw(
        `
        SELECT *
        FROM (
            SELECT uid, SUM(current_parking_count) AS parking_sum
            FROM parking_area_statistics
            WHERE created_at
            BETWEEN ?
            AND ?
            GROUP BY uid
        ) t
        WHERE parking_sum > 0
        ORDER BY parking_sum DESC
        LIMIT ?
        ;
        `,
        [fromDate, toDate, limit],
    )

    return rows
}

module.exports = {
    getParkingAreas,
    getParkingHistoryByUid,
    getPopularParkingAreas,
    getParkingAreasByArray,
}
