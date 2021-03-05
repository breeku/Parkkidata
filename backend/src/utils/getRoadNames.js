const fs = require('fs')
const axios = require('axios')
const knex = require('../database/config')

async function getRoad(lat, long) {
    let address
    await axios
        .get(
            'https://nominatim.openstreetmap.org/reverse?lat=' +
                lat +
                '&lon=' +
                long +
                '&format=json',
        )
        .then(response => {
            address = response.data
        })
    return address.address
}

;(async () => {
    const result = []
    const data = await knex.from('parking_area').select()
    console.log('This will take approx. ' + data.length + ' seconds.')
    for (const feature of data) {
        const long = feature.geometry.coordinates[0][0][0][0]
        const lat = feature.geometry.coordinates[0][0][0][1]
        const address = await getRoad(lat, long)
        console.log(address)

        result.push({
            uid: feature.uid,
            road: address.road,
            house_number: address.house_number,
        })
        await new Promise(r => setTimeout(r, 1050))
    }
    fs.writeFileSync('./src/database/utils/roads.json', JSON.stringify(result, null, 2))

    console.log('File wrote')
    return
})()
