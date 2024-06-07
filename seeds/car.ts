import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("car").del();

    // Inserts seed entries
    await knex("car").insert([
        { name: "Toyota Avanza", category: "MPV", price: 200000, image: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717012914/mhuwr8irhwqnjw7pxlmc.jpg" },
        { name: "Toyota Innova", category: "MPV", price: 300000, image: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717012914/mhuwr8irhwqnjw7pxlmc.jpg" },
        { name: "Toyota Yaris", category: "Hatchback", price: 150000, image: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717012914/mhuwr8irhwqnjw7pxlmc.jpg" },
        { name: "Toyota Fortuner", category: "SUV", price: 400000, image: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717012914/mhuwr8irhwqnjw7pxlmc.jpg" },
        { name: "Toyota Alphard", category: "MPV", price: 500000, image: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717012914/mhuwr8irhwqnjw7pxlmc.jpg" }
    ]);
};
