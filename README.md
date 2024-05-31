# Binar Car Rental - Car Management Dashboard

## Technologies Used

* TypeScript
* Node.js
* Express
* PostgreSQL
* Knex
* Objection.js

## How To Run:

- Local Host: Run with Postman, localhost IP, and Port:3000:
  - `http://127.0.0.1:3000/api/v1/dashboard` or
  - `http://localhost:3000/api/v1/dashboard`
- Online Domain: not deployed yet

## Entity Relationship Diagram (ERD)

![1717178913798](image/README/1717178913798.png)

Diagram source: [Razin -Car Management Dashboard (dbdiagram.io)](https://dbdiagram.io/d/Razin-Car-Management-Dashboard-6658ded2b65d933879209fe4)

## Installation

1. Clone repository:

   ```
   https://github.com/RazinSyakib43/Car-Management-Dashboard.git
   ```
2. Install project dependencies:

   ```
   npm install
   ```
3. Start the server:

- For development mode (with ts-node-dev for auto-reloading):

  ```
  npm run dev
  ```

3. Configure your database settings by editing the `knexfile.ts`. You can set the `user`, `password`, and `database`. Then save your changes. Example:

   ```
    development: {
       client: "postgresql",
       connection: {
         database: "car_rental_db",
         user: "your-username",
         password: "your-password"
       },
       pool: {
         min: 2,
         max: 10
       },
       migrations: {
         tableName: "knex_migrations"
       }
     },
   ```
4. Apply database schema migration:

   ```
   npx knex migrate:latest
   ```
5. Create initial data:

   ```
   npx knex seed:run
   ```
6. Run the server again to apply the new database configurations.

## API Endpoints

### Cars

#### [GET] /cars

> This endpoint is used to get a list of all available cars.

Request:

```
curl -X GET http://api/v1/dashboard/cars
```

Response:

```
[
  {
    "id": 1,
    "name": "Toyota Avanza",
    "category": "Sedan",
    "price": 500000,
    "image": "https://res.cloudinary.com/dowiubuw3/image/upload/v1717012914/mhuwr8irhwqnjw7pxlmc.jpg",
    "created_at": "2024-06-01T12:00:00.000Z",
    "updated_at": "2024-06-01T12:00:00.000Z",
    "start_rent": "2024-06-01",
    "finish_rent": "2024-06-05"
  },
  ...
]

```

## Kontribusi

Contributions are welcome! If you find a bug or have suggestions for improvements, please open an issue or submit a pull request.

[**@2024 Muhammad Razin Syakib**](https://www.linkedin.com/in/muhammad-razin-syakib/)
