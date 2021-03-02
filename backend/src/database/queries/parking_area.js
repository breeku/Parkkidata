const knex = require('../config')

// Database queries related to parking data

const getParkingAreas = async () => {
    return await knex.from('parking_area').select()
}

const getParkingHistoryByUid = async (uid, limit) => {
    return await knex
        .from('parking_area_statistics')
        .select()
        .where({ uid })
        .orderBy('id', 'desc')
        .limit(limit)
}

const getPopularParkingAreas = async (fromDate, toDate, limit, offset) => {
    // TODO: add street names
    return await knex
        .select('*')
        .from(
            knex('parking_area_statistics as p_statistics')
                .select([
                    'p_statistics.uid',
                    knex.raw(
                        `JSON_AGG(
                            JSON_BUILD_OBJECT(
                                'current_parking_count', current_parking_count, 
                                'created_at', p_statistics.created_at
                            )
                            ORDER BY p_statistics.id DESC
                            ) 
                            AS history`,
                    ),
                ])
                .sum('current_parking_count AS parking_sum')
                .whereBetween('p_statistics.created_at', [fromDate, toDate])
                .groupBy('p_statistics.uid')
                .join('parking_area AS p', 'p_statistics.uid', '=', 'p.uid')
                .select('geometry')
                .groupBy('p.id')
                .as('t'),
        )
        .where('parking_sum', '>', 0)
        .orderBy('parking_sum', 'desc')
        .limit(limit)
        .offset(offset)
}

module.exports = {
    getParkingAreas,
    getParkingHistoryByUid,
    getPopularParkingAreas,
}
