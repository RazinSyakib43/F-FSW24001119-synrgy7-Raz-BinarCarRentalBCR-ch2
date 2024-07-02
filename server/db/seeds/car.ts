import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("car").del();

    // Inserts seed entries
    await knex("car").insert([
        { name: "Toyota Avanza", category: "MPV", price: 200000, image: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717802244/gutvbvhpgapnheefhf6e.jpg" },
        { name: "Toyota Innova", category: "MPV", price: 300000, image: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717801998/jbpmiacuohmbgmxqckdr.jpg" },
        { name: "Toyota Yaris", category: "Hatchback", price: 150000, image: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717802403/yj7izvhq9bvsyurrpry9.jpg" },
        { name: "Toyota Fortuner", category: "SUV", price: 400000, image: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717802447/xvvb0ydz60h5bp3ifp3a.jpg" },
        { name: "Toyota Alphard", category: "MPV", price: 500000, image: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717802466/tkl29imqw6osiy1qmj7b.jpg" },
        { name: "Honda Civic", category: "Sedan", price: 250000, image: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717802486/ovzqzqzqzqzqzqzqzqzq.jpg", status: "deleted", deleted_at: "2024-05-30 22:27:12", deleted_by: "system"},
        { name: "Honda Jazz", category: "Hatchback", price: 180000, image: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717802506/ovzqzqzqzqzqzqzqzqzq.jpg", status: "deleted", deleted_at: "2024-05-30 22:27:12", deleted_by: "system"},
        { name: "Daithatsu Xenia", category: "MPV", price: 190000, image: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717802526/ovzqzqzqzqzqzqzqzqzq.jpg", status: "deleted", deleted_at: "2024-05-30 22:27:12", deleted_by: "system"},
    ]);
};
