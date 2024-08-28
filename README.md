# Binar Car Rental - Full Stack Web (Front-End dan Back-End)

## Deployment
- Website (has implemented the API): https://ch8fe.dauyu7ky61pqi.amplifyapp.com/
- Back-End API: https://yawning-unicorn-zeens-ed02ad15.koyeb.app/

## Repositories
- [Front-End](https://github.com/RazinSyakib43/Car-Management-Dashboard/tree/Challenge_8-(FE))
- [Back-End](https://github.com/RazinSyakib43/Car-Management-Dashboard/tree/Challenge_8-(BE))

## Halaman

1. **Landing Page**: ``{{Web_URL}}/``
   - Hero Section
   - Our Services Section
   - Why Us Section
   - Testimonial Section
   - Getting Started Section
   - Frequently Asked Questions (FAQ) Section
2. **Search Cars Page**: ``{{Web_URL}}/auth/login/``
   - Hero Section
   - Search Car Bar Section
3. **Login Page**: ``{{Web_URL}}/auth/login/``
   - Form Input Email and Password
4. **Admin Dashboard Page**: ``{{Web_URL}}/dashboard``
   * List All Cars: ``{{Web_URL}}/dashboard``
   * Cars Management (CRUD): ``{{Web_URL}}/dashboard/cars``

## Teknologi yang Digunakan

A. **Front-End**
1. TypeScript
2. React.js
3. Vite
4. Bootstrap 5
5. Axios
6. SwiperJS
7. Eslint

B. **Back-End**
1. TypeScript
2. Node.js
3. Express.js
4. PostgreSQL
5. Knex
6. Objection
7. JWT (Json Web Token)
8. Cloudinary
9. Swagger
10. Jest (Unit Testing)

C. **Deployment**
1. AWS Amplify (Front-End Web)
2. Koyeb (Back-End API)
3. Supabase (Database Hosting)

## Password for Testing

1. Superadmin

```
- email: ayano@gmail.com
- password: iamayano
```

2. Admin

```
- email: naruto@gmail.com
- password: iamnaruto
```

## Instalasi dan Penggunaan Secara Lokal

1. Clone repository:

   ```
   git clone https://github.com/RazinSyakib43/Car-Management-Dashboard.git
   ```
2. Menjalankan Program Front-End dan Back-End secara bersamaan (wajib)

   1. Front-End

      1. Arahkan ke directory Front-End (Client)

         ```
         cd client
         ```
      2. Install Dependencies

         ```
         npm install
         ```
      3. Jalankan Website

         ```
         npm run dev
         ```
   2. Back-End

      1. Arahkan ke directory Back-End (Server)

         ```
            cd server
         ```
      2. Install Dependencies

         ```
            npm install
         ```
      3. Konfigurasikan pengaturan database Anda dengan mengedit `knexfile.ts`. Anda dapat mengatur `user`, `password`, dan `database`. Kemudian simpan perubahan Anda. Contoh:
         ```
            npm install
         ```
      4. Jalankan migrasi schema database
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
      6. Jalankan data seeds
            ```
            npx knex seed:run
            ```
      7. Jalankan Server
         ```
         npm run dev
         ```


3. Untuk melakukan pengembangan atau penyesuaian, edit file project client maupun server sesuai kebutuhan Anda.

## Kontribusi

Kontribusi dipersilakan! Jika Anda menemukan bug atau memiliki saran untuk perbaikan, silakan open issue atau submit pull request

[**@2024 Muhammad Razin Syakib**](https://www.linkedin.com/in/muhammad-razin-syakib/)
