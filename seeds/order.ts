import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("order").del();

    // Inserts seed entries
    await knex("order").insert([
        { id_car: 1, id_user: 1, email: "razin@gmail.com", start_rent: "2024-05-30 22:27:12", finish_rent: "2024-06-07 22:27:12", total_price: 200000, status: "active" },
    ]);
};
