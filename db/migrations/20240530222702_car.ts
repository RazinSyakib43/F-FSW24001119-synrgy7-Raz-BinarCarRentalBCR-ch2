import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('car', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('category').notNullable();
        table.float('price').notNullable();
        table.string('image').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('car');
}

