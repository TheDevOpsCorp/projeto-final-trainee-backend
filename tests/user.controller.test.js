import supertest from "supertest";
import app from "../src/index.js";
import { pool } from "../src/database/database.js";

describe("POST user/create : signIn", () => {
  const dateNow = new Date().toUTCString();
  const body = {
    name: "test",
    password: "123",
    creAt: dateNow,
  };

  afterAll(async () => {
    await pool.query('DELETE FROM "users" WHERE username = $1', [body.name]);
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

  it("Error 400: O teste deve falhar se o body estiver incompleto", async () => {
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

  it("Error 409: O cadastro de novo usuário deve falhar se já existir um usuário com o mesmo nome.", async () => {
    await supertest(app)
      .post("/user/signin")
      .send(body)
      .expect((res) => {
        const { status, body } = res;

        if (status != 409) {
          throw new Error(
            `Satatus deveria ser 409, mas retorna ${status} - Body: \n${JSON.stringify(
              body
            )}\n`
          );
        }
      });
  });

  it("Error 400: O cadastro deve falhar se o nome de usuário não seguir o padrão de escrita.", async () => {
    const bodyError400 = {
      name: "$-M4n3r1nH0-$",
      password: "123",
      creAt: dateNow,
    };

    await supertest(app)
      .post("/user/signin")
      .send(bodyError400)
      .expect((res) => {
        const { status, body } = res;

        if (status != 400) {
          throw new Error(
            `Satatus deveria ser 400, mas retorna ${status} - Body: \n${JSON.stringify(
              body
            )}\n`
          );
        }
      });
  });
});
