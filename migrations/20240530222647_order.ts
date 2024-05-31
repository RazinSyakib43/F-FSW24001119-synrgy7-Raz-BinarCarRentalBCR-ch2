import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('order', table => {
        table.increments('id').primary();
        table.integer('id_car').unsigned().notNullable();
        table.integer('id_user').unsigned().notNullable();
        table.string('email').notNullable();
        table.timestamp('start_rent').notNullable();
        table.timestamp('finish_rent').notNullable();
        table.integer('total_price').notNullable();
        table.enum('status', ['active', 'completed', 'cancelled']).defaultTo('active');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('order');
}

