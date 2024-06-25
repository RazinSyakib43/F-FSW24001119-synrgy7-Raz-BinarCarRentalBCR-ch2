import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user").del();

    // Inserts seed entries
    await knex("user").insert([
        { name: "Razin", email: "razin@gmail.com", password: "$2a$10$UHdIm/e0cnx5q7zHD5dIrOoeD34eZgFc5/JRLPfUYHdlV/8.6WCea", avatar: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717802244/gutvbvhpgapnheefhf6e.jpg", role: "member" },
        { name: "Kanda Sorata", email: "kandasorata@gmail.com", password: "$2a$10$ER1pSfjj.T3vWr4f9K1pKe9hlnul9yP.IOdoAe5jjIk/9w3/w9fOm", avatar: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717802244/gutvbvhpgapnheefhf6e.jpg", role: "member" },
        { name: "Frieren", email: "frieren@gmail.com", password: "$2a$10$sIBz1HMgHBt9IkEa0yhu/.tl8DWyFt2Ksx/dOSiuiFHsdRWkBxaBi", avatar: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717802244/gutvbvhpgapnheefhf6e.jpg", role: "member"},
        { name: "Naruto", email: "naruto@gmail.com", password: "$2a$10$MHqjgZDhJlcXZKERV54k7udX6edZdkOD4YeT3WkkRTh/rTUjYE4k6", avatar: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717802244/gutvbvhpgapnheefhf6e.jpg", role: "admin"},
        { name: "Ayanokoji Kiyotaka", email: "ayano@gmail.com", password: "$2a$10$NQRrTzADq7Iv9PelfNKcL.iHGGZFMSsZPS90DNxSPz1zrDk80XMtC", avatar: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717802244/gutvbvhpgapnheefhf6e.jpg", role: "superadmin"},
        { name: "Sakura", email: "sakura@gmail.com", password: "$2a$10$NQRrTzADq7Iv9PelfNKcL.iHGGZFMSsZPS90DNxSPz1zrDk80XMtC", avatar: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717802244/gutvbvhpgapnheefhf6e.jpg", role: "member", status: "deleted", deleted_at: "2024-05-30 22:27:12", deleted_by: "system"},
        { name: "Sasuke", email: "sasuke@gmail.com", password: "$2a$10$NQRrTzADq7Iv9PelfNKcL.iHGGZFMSsZPS90DNxSPz1zrDk80XMtC", avatar: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717802244/gutvbvhpgapnheefhf6e.jpg", role: "admin", status: "deleted", deleted_at: "2024-05-30 22:27:12", deleted_by: "system"},
        { name: "Kakashi", email: "kakashi@gmail.com", password: "$2a$10$NQRrTzADq7Iv9PelfNKcL.iHGGZFMSsZPS90DNxSPz1zrDk80XMtC", avatar: "https://res.cloudinary.com/dowiubuw3/image/upload/v1717802244/gutvbvhpgapnheefhf6e.jpg", role: "superadmin", status: "deleted", deleted_at: "2024-05-30 22:27:12", deleted_by: "system"}
    ]);
};
