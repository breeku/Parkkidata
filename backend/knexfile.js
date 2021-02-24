require('dotenv').config()
// Update with your config settings.

module.exports = {
    development: {
        client: 'pg',
        connection: {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.PORT,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: './src/database/migrations',
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: './src/database/seeds',
        },
        debug: true,
    },

    staging: {
        client: 'pg',
        connection: {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.PORT,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: './src/database/migrations',
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: './src/database/seeds',
        },
    },

    production: {
        client: 'pg',
        connection: {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.PORT,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: './src/database/migrations',
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: './src/database/seeds',
        },
    },
}
