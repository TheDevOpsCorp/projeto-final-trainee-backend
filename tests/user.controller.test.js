import supertest from "supertest";
import app from "../src/index.js";
import { pool } from "../src/database/database.js";

describe("POST user/create : signIn", () => {
  const body = {
    name: "test",
    password: "123",
    creAt: "2024-08-20",
  };

  afterAll(async () => {
    await pool.query('DELETE FROM "users" WHERE username = $1', [body.name]);
  });
});
