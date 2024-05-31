# Binar Car Rental - Car Management Dashboard

## Technologies Used

* TypeScript
* Node.js
* Express
* Knex
* PostgreSQL

## How To Run:

- Local Host: Run with Postman, localhost IP, and Port:3000:
  - `http://127.0.0.1:3000/api/v1/dashboard` or
  - `http://localhost:3000/api/v1/dashboard`
- Online Domain: not deployed yet

## Entity Relationship Diagram (ERD)

![1717178913798](image/README/1717178913798.png)

Diagram source: [Razin -Car Management Dashboard (dbdiagram.io)](https://dbdiagram.io/d/Razin-Car-Management-Dashboard-6658ded2b65d933879209fe4)

## Installation

### Repositori

1. Clone repositori:
   ```
   git clone https://github.com/RazinSyakib43/f-fsw24001119-synrgy7-raz-bcr-ch5
   ```
2. Menginstall depedencies
   ```
   npm install
   ```

### Database

1. Buat database PostgreSQL bernama `car_rental_db `atau nama lain sesuai keinginan
2. Update database, username, dan password pada section **connection** di file **knexfile.ts**
3. Jalankan command dibawah ini untuk migrasi database schema:

   ```
   npx knex migrate:latest
   ```
4. Jalankan command dibawah ini untuk menginisiasi data awalan:

   ```
   npx knex seed:run
   ```

### Running

1. Jalankan command dibawah ini untuk menjalankan program:

   ```
   npm run dev
   ```
2. Untuk melakukan pengembangan atau penyesuaian, edit sesuai kebutuhan Anda.

## API Endpoints

## Kontribusi

Kontribusi dipersilakan! Jika Anda menemukan bug atau memiliki saran untuk perbaikan, silakan open issue atau submit pull request

[**@2024 Muhammad Razin Syakib**](https://www.linkedin.com/in/muhammad-razin-syakib/)
