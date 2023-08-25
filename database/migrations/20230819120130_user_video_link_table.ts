import { Knex } from 'knex';
import { timestamps } from '../helpers';

const tableName = 'user_video';
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, function (table) {
    table.bigIncrements('id');
    table.uuid('uuid').index();
    table
      .bigInteger('user_id')
      .unsigned()
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
    table
      .bigInteger('video_id')
      .unsigned()
      .references('videos.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
    timestamps(knex, table, tableName);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(tableName);
}
