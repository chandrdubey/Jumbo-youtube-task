import 'dotenv/config';
import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

module.exports = {
  client: 'pg',
  debug: !!+process.env.DB_DEBUG,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset: 'utf8',
    ssl: true,
  },
  useNullAsDefault: true,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'migrations',
    directory: './database/migrations',
    extension: 'ts',
  },
  ...knexSnakeCaseMappers(),
} as Knex.Config;
