import supertest from 'supertest';
import app from '../../src/index.js';
import { pool } from '../../src/database/database.js';
import { formatObject } from '../../src/helpers/general_helpers.js';
import { truncateUsersTable } from '../../src/helpers/trucate.js';

beforeEach(async () => {
  await truncateUsersTable();
});

afterEach(async () => {
  await truncateUsersTable();
});

describe('POST /usuario/login login', () => {
  const path = '/usuario/login';

  it('Status 200: A rota deve verificar os dados e liberar o acesso', async () => {
    const body = {
      user_name: 'tales',
      password: '123',
    };

    await pool.query(
      `
            INSERT INTO "users" (username, password)
            VALUES ($1, $2);
        `,
      [body.user_name, body.password]
    );
    await supertest(app)
      .post(path)
      .send(body)
      .expect((res) => {
        const { body, status } = res;
        try {
          expect(status).toBe(200);
          expect(body).toHaveProperty('token');
        } catch (err) {
          throw new Error(`
                        body: \n${formatObject(body)}\n
                        status: \n${status}\n
                        error: \n${err}\n
                    `);
        }
      });
  });

  it('Status 400: Deve dar erro se o body estiver incompleto', async () => {
    const testes = [
      {
        teste_name: 'deve dar erro se não mandar password',
        user_name: 'tales',
      },
      {
        teste_name: 'deve dar erro se não mandar user name',
        password: '123',
      },
    ];

    for (const test of testes) {
      await supertest(app)
        .post(path)
        .send(test)
        .expect((res) => {
          const { body, status } = res;

          try {
            expect(status).toBe(400);
            expect(body).toHaveProperty(
              'error',
              'password or user name not provided'
            );
          } catch (error) {
            throw new Error(`
                    teste_name: \n${test.teste_name}\n
                    body: \n${formatObject(body)}\n
                    status: \n${status}\n
                    error: \n${error}\n    
                `);
          }
        });
    }
  });

  it('Status 404: deve dar erro se o usuario não existir', async () => {
    const test = {
      user_name: 's9fg8w7qeg0fbwe08fgd89wegq8hf832ghdfs',
      password: '1203746dsgfi',
    };

    await supertest(app)
      .post(path)
      .send(test)
      .expect((res) => {
        const { body, status } = res;

        try {
          expect(status).toBe(404);
          expect(body).toHaveProperty(
            'error',
            'user with given name does not exist'
          );
        } catch (err) {
          throw new Error(`
                test: \n${formatObject(test)} \n
                body: \n${formatObject(body)} \n
                error: \n${err}\n
                    `);
        }
      });
  });

  it('Status 401: deve dar erro se o a senha enviada não corresponder com a do banco de dados', async () => {
    const body = {
      user_name: 'tales',
      password: '123',
    };

    await pool.query(
      `
            INSERT INTO "users" (username, password)
            VALUES ($1, $2);
        `,
      [body.user_name, body.password]
    );
    await supertest(app)
      .post(path)
      .send({
        user_name: body.user_name,
        password: body.password + 'super errado essa senha',
      })
      .expect((res) => {
        const { body, status } = res;
        try {
          expect(status).toBe(401);
          expect(body).toHaveProperty('error', 'unauthorized');
        } catch (err) {
          throw new Error(`
                body: \n${body}\n
                status: \n${status}\n
                error: \n${err}\n
        `);
        }
      });
  });
});
