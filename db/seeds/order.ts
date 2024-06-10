import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("order").del();

    // Inserts seed entries
    await knex("order").insert([
        { id_car: 1, id_user: 1, start_rent: "2024-05-30 22:27:12", rent_duration: 3, finish_rent: "2024-06-02 22:27:12", total_price: 600000, status: "active" },
        { id_car: 3, id_user: 2, start_rent: "2024-05-30 22:27:12", rent_duration: 7, finish_rent: "2024-06-06 22:27:12", total_price: 2100000, status: "active" },
        { id_car: 5, id_user: 3, start_rent: "2024-05-30 22:27:12", rent_duration: 2, finish_rent: "2024-06-01 22:27:12", total_price: 300000, status: "cancelled" },
    ]);
};
