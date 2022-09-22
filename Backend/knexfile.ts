import type { Knex } from "knex";
import dotnev from "dotenv";
dotnev.config();
// console.log("check env",process.env.NODE_ENV)

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
    development: {
        client: "postgresql",
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        },
    },

    staging: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },

    production: {
        client: "postgresql",
        connection: {
            host: process.env.RDS_HOST,
            database: process.env.RDS_DB_NAME,
            user: process.env.RDS_DB_USERNAME,
            password: process.env.RDS_DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};

module.exports = config;
const knexConfigs = config;
export default knexConfigs;
