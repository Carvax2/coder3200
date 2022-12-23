const dotenv = require('dotenv');
dotenv.config();

DATABASE_HOST=process.env.DATABASE_HOST || "localhost"
DATABASE_PORT=process.env.DATABASE_PORT|| "3306"
DATABASE_USER=process.env.DATABASE_USER|| "coder"
DATABASE_PASSWORD=process.env.DATABASE_PASSWORD || "coder"
DATABASE_NAME=process.env.DATABASE_NAME || "coder_db16"

const knexConfig = {
    client: 'mysql',
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations',
    },
    seeds: {
      tableName: 'knex_seeds',
      directory: './db/seeds',
    },
};

module.exports = knexConfig;
