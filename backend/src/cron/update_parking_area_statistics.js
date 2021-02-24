require('dotenv').config()
const axios = require('axios')
const knex = require('../database/config')

;(async () => {
    let next = 'https://pubapi.parkkiopas.fi/public/v1/parking_area_statistics/'

    while (next) {
        try {
            await new Promise(resolve => setTimeout(resolve, 500))
            const { data } = await axios.get(next)
            for (const result of data.results) {
                await knex('parking_area_statistics').insert({
                    uid: result.id,
                    current_parking_count: result.current_parking_count,
                })
            }
            next = data.next
            console.log(new Date().toString() + ': ' + next)
        } catch (e) {
            console.error(e)
        }
    }
    knex.destroy()
    return
})()
