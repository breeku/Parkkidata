const axios = require("axios")

exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("parking_area")
        .del()
        .then(async function () {
            // Inserts seed entries
            // hae data axios.get() parkkihubista
            // tallenna data tietokantaan
            // hae lisää dataa parkkihubista, "next" on seuraava url
            let next = "https://pubapi.parkkiopas.fi/public/v1/parking_area/"

            while (next) {
                try {
                    const { data } = await axios.get(next)
                    for (const feature of data.features) {
                        await knex("parking_area").insert({
                            uid: feature.id,
                            geometry: JSON.stringify(feature.geometry),
                            capacity_estimate:
                                feature.properties.capacity_estimate,
                        })
                    }
                    next = data.next
                    console.log(next)
                } catch (e) {
                    console.error(e)
                }
            }
            return
        })
}
