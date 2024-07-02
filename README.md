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
    - `/auth`
    - `/cars`
    - `/users`
    - `/orders`
- Online Domain: not deployed yet

## Entity Relationship Diagram (ERD)

![1719878363234](image/README/1719878363234.png)

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

### 2. Auth (Register)

#### Register Admin

- **Endpoint**: `/auth/register/admin`
- **Method**: POST
- **Description**: This endpoint is used to register a new admin. Only superadmins are authorized to access this endpoint.
- **Security**: Requires authentication token as superadmin (`auth`).

##### Request Body

```multipart/form-data
{
  "name": "Sebastian Vettel",
  "email": "vettel@gmail.com",
  "password": "iamvettel",
  "avatar": "binary-data"
}
```

##### Response Body:

```application/json
{
  "code": 201,
  "status": "success",
  "message": "User (Admin) created successfully",
  "data": {
    "id": 15,
    "name": "Sebastian Vettel",
    "email": "vettel@gmail.com",
    "avatar": "http://res.cloudinary.com/dowiubuw3/image/upload/v1718371585/zwrjqdcx5q9cj8nm536v.jpg",
    "role": "admin",
    "created_at": "2024-06-14T13:26:25.636Z",
    "created_by": "superadmin - Ayanokoji Kiyotaka",
    "updated_at": "2024-06-14T13:26:25.636Z",
    "updated_by": "superadmin - Ayanokoji Kiyotaka"
  }
}
```

#### Register Member

- **Endpoint**: `/auth/register/member`
- **Method**: POST
- **Description**: This endpoint is used to register a new member.

##### Request Body

```multipart/form-data
{
  "name": "Mitsuha Miyamizu",
  "email": "mitsuha@gmail.com",
  "password": "iammitsuha",
  "avatar": "binary-data"
}
```

##### Response Body:

```application/json
{
  "code": 201,
  "status": "success",
  "message": "User (Member) created successfully",
  "data": {
    "id": 15,
    "name": "Mitsuha Miyamizu",
    "email": "mitsuha@gmail.com",
    "avatar": "http://res.cloudinary.com/dowiubuw3/image/upload/v1719425557/mr16viuotnwfavwr1bpu.gif",
    "role": "member",
    "created_at": "2024-06-14T13:26:25.636Z",
    "created_by": "member - Mitsuha Miyamizu",
    "updated_at": "2024-06-14T13:26:25.636Z",
    "updated_by": "member - Mitsuha Miyamizu"
  }
}
```

### 3. Cars (/cars)

#### [GET] Get All Cars

> Retrieves a list of all available cars in the system.

Endpoint: `/api/v1/cars/`

Request Body:

```
curl --location 'http://localhost:3000/api/v1/dashboard/cars'
```

Response Body:

```
{
    "code": 200,
    "status": "success",
    "data": [
        {
            "id": 1,
            "name": "Toyota Avanza",
            "category": "MPV",
            "price": 200000,
            "start_rent": "2024-05-30T15:27:12.000Z",
            "finish_rent": "2024-06-02T15:27:12.000Z",
            "image": "https://res.cloudinary.com/dowiubuw3/image/upload/v1717012914/mhuwr8irhwqnjw7pxlmc.jpg",
            "status": "active",
            "createdAt": "2024-06-07T19:33:12.365Z",
            "updatedAt": "2024-06-07T19:33:12.365Z"
        },
        {
            "id": 2,
            "name": "Toyota Innova",
            "category": "MPV",
            "price": 300000,
            "start_rent": "2024-05-30T15:27:12.000Z",
            "finish_rent": "2024-06-06T15:27:12.000Z",
            "image": "https://res.cloudinary.com/dowiubuw3/image/upload/v1717012914/mhuwr8irhwqnjw7pxlmc.jpg",
            "status": "active",
            "createdAt": "2024-06-07T19:33:12.365Z",
            "updatedAt": "2024-06-07T19:33:12.365Z"
        },
        {
            "id": 3,
            "name": "Toyota Yaris",
            "category": "Hatchback",
            "price": 150000,
            "start_rent": null,
            "finish_rent": null,
            "image": "https://res.cloudinary.com/dowiubuw3/image/upload/v1717012914/mhuwr8irhwqnjw7pxlmc.jpg",
            "status": null,
            "createdAt": "2024-06-07T19:33:12.365Z",
            "updatedAt": "2024-06-07T19:33:12.365Z"
        },
        ...
    ]
}
```

#### [GET] Search a Car

> Searches for cars based on car name.

Endpoint: `/api/v1/cars/search?title=`

Request Body:

```
curl --location 'http://localhost:3000/api/v1/dashboard/cars/search?title=Alphard'
```

Response Body:

```
{
    "code": 200,
    "status": "success",
    "data": [
        {
            "id": 5,
            "name": "Toyota Alphard",
            "category": "MPV",
            "price": 500000,
            "start_rent": null,
            "finish_rent": null,
            "image": "https://res.cloudinary.com/dowiubuw3/image/upload/v1717012914/mhuwr8irhwqnjw7pxlmc.jpg",
            "status": null,
            "createdAt": "2024-06-07T19:33:12.365Z",
            "updatedAt": "2024-06-07T19:33:12.365Z"
        }
    ]
}
```

#### [GET] Get a Car by Id

> Retrieves detailed information about a specific car by its ID.

Endpoint: `/api/v1/cars/:id`

Request Body:

```
curl --location 'http://localhost:3000/api/v1/dashboard/cars/5'
```

Response Body:

```
{
    "code": 200,
    "status": "success",
    "data": {
        "id": 5,
        "name": "Toyota Alphard",
        "category": "MPV",
        "price": 500000,
        "start_rent": null,
        "finish_rent": null,
        "image": "https://res.cloudinary.com/dowiubuw3/image/upload/v1717012914/mhuwr8irhwqnjw7pxlmc.jpg",
        "status": null,
        "createdAt": "2024-06-07T19:33:12.365Z",
        "updatedAt": "2024-06-07T19:33:12.365Z"
    }
}
```

#### [POST] Create a Car

> Adds a new car to the system.

Endpoint: `/api/v1/cars/`

Request Body:

```
curl --location 'http://localhost:3000/api/v1/dashboard/cars/' \
--form 'name="Honda NSX 2024"' \
--form 'category="Supercar"' \
--form 'price="2500000"' \
--form 'image=@"/C:/Users/muham/OneDrive/Desktop/images/car01.min.jpg"'

```

Response Body:

```
{
    "code": 201,
    "status": "success",
    "message": "Car added successfully",
    "data": {
        "id": 6,
        "name": "Honda NSX 2024",
        "category": "Supercar",
        "price": "2500000",
        "image": "https://res.cloudinary.com/dowiubuw3/image/upload/v1717794160/erq84bihs4gbfg59zqhi.jpg"
    }
}

```

#### [PUT] Edit a Car Data

> Updates the details of a specific car by its ID.

Endpoint: `/api/v1/cars/:id`

Request Body:

```
curl --location --request PUT 'http://localhost:3000/api/v1/dashboard/cars/6' \
--form 'name=""' \
--form 'category=""' \
--form 'price=""' \
--form 'image=@"/C:/Users/muham/OneDrive/Desktop/images/car09.min.jpg"'

```

Response Body:

```
{
    "code": 200,
    "status": "success",
    "message": "Car updated successfully",
    "data": {
        "id": "6",
        "name": "Honda NSX 2024",
        "category": "Supercar",
        "price": 2500000,
        "image": "https://res.cloudinary.com/dowiubuw3/image/upload/v1717802631/rlwgszbxkiqh6nxnapnr.jpg",
        "createdAt": "2024-06-07T23:13:18.435Z",
        "updatedAt": "2024-06-07T23:23:51.335Z"
    }
}

```

#### [DEL] Delete a Car

> Deletes a specific car from the system by its ID.

Endpoint: `/api/v1/cars/:id`

Request Body:

```
curl --location --request DELETE 'http://localhost:3000/api/v1/dashboard/cars/6'
```

Response Body:

```
{
    "code": 200,
    "status": "success",
    "message": "Car with id 6 deleted successfully"
}

```



## Contribution

Contributions are welcome! If you find a bug or have suggestions for improvements, please open an issue or submit a pull request.

[**@2024 Muhammad Razin Syakib**](https://www.linkedin.com/in/muhammad-razin-syakib/)
