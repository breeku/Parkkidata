const axios = require("axios")

async function getRoad(lat, long) {
  let address
  await axios
    .get('https://nominatim.openstreetmap.org/reverse?lat=' + lat + '&lon=' + long + '&format=json')
    .then(response => {
      address = response.data
    })
  return address.address.road
}

exports.seed = function (knex) {
  return knex("parking_area")
    .then(async function () {
      try {
        const data = await knex.from('parking_area').select()
        for (const feature of data) {
          const long = feature.geometry.coordinates[0][0][0][0]
          const lat = feature.geometry.coordinates[0][0][0][1]
          let address = await getRoad(lat, long)
          console.log(address)
          await knex("parking_area").where({ id: feature.id }).update({
            road: address,
          })
        }
      } catch (e) {
        console.error(e)
      }
      return
    })
}