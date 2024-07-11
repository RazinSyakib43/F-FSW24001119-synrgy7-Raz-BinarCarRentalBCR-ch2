import { Knex } from "knex";

const fs = require('fs');
const path = require('path');

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("car").del();

    // Load Car JSON Data file
    const cars = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/cars.min.json'), 'utf8'));

    // Inserts seed entries
    await knex("car").insert(cars);
};
