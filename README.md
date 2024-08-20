# Binar Car Rental - Full Stack Web (Front-End dan Back-End)

## Deployment

(Halaman ini belum di deploy)

## Repositories
- [Front-End](https://github.com/RazinSyakib43/Car-Management-Dashboard/tree/Challenge-8-(Client))
- [Back-End](https://github.com/RazinSyakib43/Car-Management-Dashboard/tree/Challenge-8-(Server))

## Halaman

1. **Landing Page**
   - Hero Section
   - Our Services Section
   - Why Us Section
   - Testimonial Section
   - Getting Started Section
   - Frequently Asked Question (FAQ) Section
2. **Search Cars Page**
   - Hero Section
   - Search Car Bar Section
3. **Login Page**
4. **Admin Dashboard Page**
   * List All Cars
   * Cars Management (CRUD)

## Teknologi yang Digunakan

A. **Front-End**

1. React.js
2. Bootstrap 5
3. SwiperJS
4. Axios

B. **Back-End**

1. TypeScript
2. Node.js
3. Express.js
4. Postgresql
5. Knex
6. Objection
7. JWT (Json Web Token)
8. Cloudinary
9. Swagger

## Instalasi dan Penggunaan

1. Clone repositori:

   ```
   git clone https://github.com/RazinSyakib43/Car-Management-Dashboard.git
   ```
2. Menjalankan Program Front-End dan Back-End secara bersamaan (wajib)

   1. Front-End

      1. Arahkan ke directory Front-End (Client)

         ```
         cd client
         ```
      2. Install Depedencies

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
      2. Install Depedencies

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

## Kontribusi

Kontribusi dipersilakan! Jika Anda menemukan bug atau memiliki saran untuk perbaikan, silakan open issue atau submit pull request

[**@2024 Muhammad Razin Syakib**](https://www.linkedin.com/in/muhammad-razin-syakib/)
