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

  it("Error 400: O teste deve falher se o body estiver incompleto", async () => {
    const bodyError400 = {
      name: "",
      password: "",
      creAt: "",
    };

    await supertest(app)
      .post("/user/signin")
      .send(bodyError400)
      .expect((res) => {
        const { body, status } = res;

        if (status != 400) {
          throw new Error(
            `Status deveria ser 400, mas recebe ${status} - Body: \n${JSON.stringify(
              body
            )}\n\n`
          );
        }
      });
  });

  it("Pass 200: O usuário deve ser criado corretamente", async () => {
    await supertest(app)
      .post("/user/signin")
      .send(body)
      .expect((res) => {
        const { status, body } = res;

        if (status != 200) {
          throw new Error(
            `Status deveria ser 200, mas retorna ${status} - Body: \n${JSON.stringify(
              body
            )}\n`
          );
        }
      });
  });
});
