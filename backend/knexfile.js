require('dotenv').config()
// Update with your config settings.

module.exports = {
    development: {
        client: 'pg',
        connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
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

    test: {
        client: 'pg',
        connection: {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.TEST_DB_NAME,
            password: process.env.DB_PASSWORD,
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
        connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
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
        connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
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
