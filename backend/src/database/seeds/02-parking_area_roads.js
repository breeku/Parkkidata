const fs = require('fs')

const stringified = fs.readFileSync('./src/database/utils/roads.json')
const data = JSON.parse(stringified)

exports.seed = async function (knex) {
    return knex.transaction(trx => {
        const queries = []
        for (const { uid, road, house_number } of data) {
            if (road || house_number) {
                const query = knex('parking_area')
                    .where({ uid })
                    .update({
                        road,
                        house_number,
                    })
                    .transacting(trx) // This makes every update be in the same transaction

                queries.push(query)
            }
        }

        Promise.all(queries) // Once every query is written
            .then(trx.commit) // We try to execute all of them
            .catch(trx.rollback) // And rollback in case any of them goes wrong
    })
}
