const axios = require("axios")

exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("parking_area")
        .del()
        .then(function () {
            // Inserts seed entries
            // hae data axios.get() parkkihubista
            // tallenna data tietokantaan
            // hae lisää dataa parkkihubista, "next" on seuraava url
        })
}
