exports.up = function (knex) {
    return knex.schema.alterTable('parking_area', table => {
        table.string('road')
        table.string('house_number')
    })
}

exports.down = function (knex) {
    return knex.schema.alterTable('parking_area', table => {
        table.dropColumn('road')
        table.dropColumn('house_number')
    })
}
