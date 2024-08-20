import type { Knex } from 'knex';

const randomBoolean = Math.random() < 0.5 ? true : false;

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('car', table => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('plate').notNullable();
        table.string('manufacture').notNullable();
        table.string('model').notNullable();
        table.string('image').notNullable();
        table.integer('rentPerDay').notNullable();
        table.integer('capacity').notNullable();
        table.text('description');
        table.boolean('driverType').notNullable();
        table.timestamp('availableAt').notNullable().defaultTo(knex.fn.now());
        table.string('transmission').notNullable();
        table.boolean('available').notNullable().defaultTo(randomBoolean);
        table.string('type').notNullable();
        table.integer('year').notNullable();
        table.specificType('options', 'text ARRAY');
        table.specificType('specs', 'text ARRAY');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.string("created_by").notNullable().defaultTo('system');
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.string("updated_by").notNullable().defaultTo('system');
        table.enum('status', ['active', 'deleted']).notNullable().defaultTo('active');
        table.timestamp('deleted_at').defaultTo(null);
        table.string("deleted_by").defaultTo(null);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('car');
}

