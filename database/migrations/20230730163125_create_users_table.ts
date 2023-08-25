import { Knex } from 'knex';
import { timestamps } from '../helpers';

let tableName = 'users';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, function (table) {
    table.bigIncrements('id');
    table.uuid('uuid').index();
    table.string('first_name');
    table.string('last_name');
    table.string('user_name').unique();
    table.string('email').unique();
    table.string('password');
    timestamps(knex, table, tableName);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(tableName);
}
