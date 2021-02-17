require("dotenv").config()
// Update with your config settings.

module.exports = {
    development: {
        client: "postgresql",
        connection: {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "./src/database/migrations",
            tableName: "knex_migrations",
        },
        seeds: {
            directory: "./src/database/seeds",
        },
    },

    staging: {
        client: "postgresql",
        connection: {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "./src/database/migrations",
            tableName: "knex_migrations",
        },
        seeds: {
            directory: "./src/database/seeds",
        },
    },

    production: {
        client: "postgresql",
        connection: {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "./src/database/migrations",
            tableName: "knex_migrations",
        },
        seeds: {
            directory: "./src/database/seeds",
        },
    },
}
