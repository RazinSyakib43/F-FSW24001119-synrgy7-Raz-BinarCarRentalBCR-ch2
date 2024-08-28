import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: "postgresql://postgres.hgxmajbxzfwodrzbdpmc:oQxil5ODW3SK@aws-0-us-east-1.pooler.supabase.com:6543/postgres",
    pool: {
      min: 0,
      max: 7
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      host: "carrentalch7db.cjss6eo44hm5.ap-southeast-1.rds.amazonaws.com",
      port: 5432,
      database: "car_rental_ch7_db",
      user: "ch8admin",
      password: "oQxil5ODW3SK",
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      host: "carrentalch7db.cjss6eo44hm5.ap-southeast-1.rds.amazonaws.com",
      port: 5432,
      database: "car_rental_ch7_db",
      user: "ch8admin",
      password: "oQxil5ODW3SK",
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;
