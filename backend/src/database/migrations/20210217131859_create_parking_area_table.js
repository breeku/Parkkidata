exports.up = knex => {
    return knex.schema.createTable('parking_area', table => {
        table.increments()
        table.string('uid').notNullable()
        table.jsonb('geometry').notNullable()
        table.integer('capacity_estimate')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}

exports.down = knex => {
    return knex.schema.dropTable('parking_area')
}
