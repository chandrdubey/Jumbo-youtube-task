import { Knex } from 'knex';
import { timestamps } from '../helpers';

const tableName = 'videos';
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, function (table) {
    table.bigIncrements('id');
    table.uuid('uuid').index();
    table.string('yt_id').index().unique();
    table.string('title').index();
    table.text('description');
    table.timestamp('published_at');
    table.string('thumbnail_url', 500);
    table.string('video_url', 500);
    timestamps(knex, table, tableName);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(tableName);
}
