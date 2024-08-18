CREATE TABLE "follows" (
  "following_user_id" integer NOT NULL,
  "followed_user_id" integer NOT NULL,
  "created_at" timestamp
);

CREATE TABLE "users" (
  "id" serial PRIMARY KEY ,
  "username" varchar NOT NULL,
  "password" varchar NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT 'NOW()'
);

CREATE TABLE "posts" (
  "id" integer PRIMARY KEY NOT NULL,
  "title" varchar NOT NULL,
  "body" text NOT NULL,
  "user_id" integer NOT NULL,
  "created_at" timestamp DEFAULT 'NOW()'
);

COMMENT ON COLUMN "posts"."body" IS 'Content of the post';

ALTER TABLE "posts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "follows" ADD FOREIGN KEY ("following_user_id") REFERENCES "users" ("id");

ALTER TABLE "follows" ADD FOREIGN KEY ("followed_user_id") REFERENCES "users" ("id");
