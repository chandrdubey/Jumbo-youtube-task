import { Knex } from 'knex';

export function timestamps(knex: Knex, table, tableName: string) {
  table
    .dateTime('created_at')
    .notNullable()
    .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  table
    .dateTime('updated_at')
    .notNullable()
    .defaultTo(knex.raw('CURRENT_TIMESTAMP '));
  knex.schema.raw(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
     NEW."updated_at"=now(); 
     RETURN NEW;
    END;
    $$ language 'plpgsql';
  `).raw(`
    CREATE TRIGGER ${tableName}_updated_at BEFORE UPDATE
    ON ${tableName} FOR EACH ROW EXECUTE PROCEDURE 
    update_updated_at_column();
  `);
}
