exports.up = knex => {
    return knex.schema.createTable('parking_area_statistics', table => {
        table.increments()
        table.string('uid').notNullable()
        table.integer('current_parking_count')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}

exports.down = knex => {
    return knex.schema.dropTable('parking_area_statistics')
}
