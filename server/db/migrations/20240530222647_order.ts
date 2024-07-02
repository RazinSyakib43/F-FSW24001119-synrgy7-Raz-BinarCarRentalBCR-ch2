import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('order', table => {
        table.increments('id').primary();
        table.integer('id_user').unsigned().notNullable();
        table.integer('id_car').unsigned().notNullable();
        table.timestamp('start_rent').notNullable();
        table.integer('rent_duration').notNullable();
        table.timestamp('finish_rent').notNullable();
        table.integer('total_price').notNullable();
        table.enum('status', ['active', 'completed', 'cancelled', 'deleted']).defaultTo('active');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.string("created_by").notNullable().defaultTo('system');
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.string("updated_by").notNullable().defaultTo('system');
        table.timestamp('deleted_at').defaultTo(null);
        table.string("deleted_by").defaultTo(null);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('order');
}

