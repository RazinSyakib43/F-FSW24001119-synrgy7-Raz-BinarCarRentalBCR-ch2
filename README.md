# Binar Car Rental - Car Management Dashboard

Welcome to the **Binar Car Rental - Car Management Dashboard** . This dashboard is designed to provide a comprehensive solution for managing car rentals efficiently. It offers a user-friendly interface for administrators to manage cars, users, and rental orders seamlessly.

## Technologies Used

- TypeScript
- Node.js
- Express
- PostgreSQL
- Knex
- Objection.js
- Multer
- Cloudinary
- Swagger

## How To Run:

- Local Host: Run with Postman, localhost IP, and Port:3000:
  - `http://127.0.0.1:3000/api/v1/dashboard` or
  - `http://localhost:3000/api/v1/dashboard`
    - `/cars`
    - `/users`
    - `/orders`
- Online Domain: not deployed yet

## Entity Relationship Diagram (ERD)

![1718265278822](image/README/1718265278822.png)

Diagram source: [Razin -Car Management Dashboard API (dbdiagram.io)](https://dbdiagram.io/d/Razin-Car-Management-Dashboard-API-666aa385a179551be6c66564)

## Installation

1. Clone repository:

   ```
   https://github.com/RazinSyakib43/Car-Management-Dashboard.git
   ```

2. Install project dependencies:

   ```
   npm install
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

6. Run the server (with ts-node-dev for auto-reloading):

   ```
   npm run dev
   ```

## API Documentations

Full API documentation for this API is available at:

```
http://localhost:3000/api-docs/
```

**You can instantly try each endpoint**, complete with descriptions, parameters, and sample responses. **Open this URL using a web browser** to access an interactive interface that lets you experiment with the API.

## API Endpoints

- Base URL:

  ```
  http://localhost:3000/api/v1/dashboard/
  ```

  - `/auth`
  - `/cars`
  - `/users`
  - `/orders`

- Status Code:

  - **200 OK** : The request was successful.
  - **201 Created** : Resource created successfully.
  - **400 Bad Request** : The request is invalid.
  - **404 Not Found** : Data not found.
  - **500 Internal Server Error** : Server error.

### 1. Auth

#### Auth (Login) - Superadmin

- **Endpoint**: `/auth/login/superadmin`
- **Method**: POST
- **Summary**: Login Superadmin
- **Description**: This is the login endpoint for superadmin to access the superadmin dashboard

##### Request Body:

```multipart/form-data
{
  "email": "ayano@gmail.com",
  "password": "iamayano"
}
```

##### Response Body:

```application/json
{
  "code": 200,
  "status": "success",
  "message": "Successfully login as superadmin! Welcome, Ayanokoji Kiyotaka!",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hcnV0b0BnbWFpbC5jb20iLCJpYXQiOjE3MTgzNjA5NjUsImV4cCI6MTcxODQ0NzM2NX0.tLawICmoS0oAO7DFL0yo9efvhOJsWpX5S4jdla1yNvo"
  }
}
```

#### Auth (Login) - Admin

- **Endpoint**: `/auth/login/admin`
- **Method**: POST
- **Summary**: Login Admin
- **Description**: This is the login endpoint for admin to access the admin dashboard

##### Request Body:

```multipart/form-data
{
  "email": "naruto@gmail.com",
  "password": "iamnaruto"
}
```

##### Response Body:

```application/json
{
  "code": 200,
  "status": "success",
  "message": "Successfully login as admin! Welcome, Naruto!",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hcnV0b0BnbWFpbC5jb20iLCJpYXQiOjE3MTgzNjA5NjUsImV4cCI6MTcxODQ0NzM2NX0.tLawICmoS0oAO7DFL0yo9efvhOJsWpX5S4jdla1yNvo"
  }
}

```

#### Auth (Login) - Member

- **Endpoint**: `/auth/login/member`
- **Method**: POST
- **Summary**: Login Member
- **Description**: This is the login endpoint for member to get access to the dashboard

##### Request Body:

```multipart/form-data
{
  "email": "razin@gmail.com",
  "password": "iamrazin"
}

```

##### Response Body:

```application/json
{
  "code": 200,
  "status": "success",
  "message": "Successfully login as member! Welcome, Razin!",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hcnV0b0BnbWFpbC5jb20iLCJpYXQiOjE3MTgzNjA5NjUsImV4cCI6MTcxODQ0NzM2NX0.tLawICmoS0oAO7DFL0yo9efvhOJsWpX5S4jdla1yNvo"
  }
}

```




## Contribution

Contributions are welcome! If you find a bug or have suggestions for improvements, please open an issue or submit a pull request.

[**@2024 Muhammad Razin Syakib**](https://www.linkedin.com/in/muhammad-razin-syakib/)
