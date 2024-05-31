CREATE TABLE "order" (
  "id" integer PRIMARY KEY,
  "id_car" integer,
  "id_user" integer,
  "email" varchar(255),
  "start_rent" date,
  "finish_rent" date,
  "total_price" float,
  "status" enum,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "car" (
  "id" integer PRIMARY KEY,
  "name" varchar(255),
  "category" varchar(100),
  "price" float,
  "image" varchar(255),
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "user" (
  "id" integer PRIMARY KEY,
  "name" varchar(255),
  "email" varchar(255),
  "created_at" timestamp,
  "updated_at" timestamp
);

ALTER TABLE "order" ADD FOREIGN KEY ("id_user") REFERENCES "user" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("id_car") REFERENCES "car" ("id");
