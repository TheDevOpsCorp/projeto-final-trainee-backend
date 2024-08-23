import supertest from 'supertest';
import test_app from './test.router.js';
import { signJWT } from '../src/helpers/auth.js';
import { formatObject } from '../src/helpers/general_helpers.js';
import pool from '../src/database/database.js';

describe('AUTH TEST', () => {
  afterAll(async () => {
    await pool.query('TRUNCATE TABLE users CASCADE');
  });
  const path = '/test/middlware/autenticacao';

  it('401: token nao veio na autenticacao', async () => {
    await supertest(test_app)
      .post(path)
      .send()
      .expect((res) => {
        const { status, body } = res;
        try {
          expect(status).toBe(401);
          expect(body).toHaveProperty('error', 'invalido');
        } catch (error) {
          throw new Error(`
                                 \n${status}\n
                                 \n${formatObject(body)}\n
                                 \n${error}\n
                        `);
        }
      });
  });

  it('401: token deve expirar quando passar o tempo', async () => {
    const token = signJWT({ id: 1 }, { expiresIn: '1ms' });
    await supertest(test_app)
      .post(path)
      .set('Authorization', `Bearer ${token}`)
      .expect((res) => {
        const { status, body } = res;
        try {
          expect(status).toBe(401);
          expect(body).toHaveProperty('error', 'expirado');
        } catch (error) {
          throw new Error(`
                        \n${status}\n
                        \n${formatObject(body)}\n
                        \n${error}\n
               `);
        }
      });
  });

  it('401: token deve ser invalido', async () => {
    await supertest(test_app)
      .post(path)
      .set('Authorization', `Bearer lalaal`)
      .expect((res) => {
        const { status, body } = res;
        try {
          expect(status).toBe(401);
          expect(body).toHaveProperty('error', 'invalido');
        } catch (error) {
          throw new Error(`
                       \n${status}\n
                       \n${formatObject(body)}\n
                       \n${error}\n
              `);
        }
      });
  });
  it('404: Usuario nao encontrado', async () => {
    const token = signJWT({ id: 8 });
    await supertest(test_app)
      .post(path)
      .set('Authorization', `Bearer ${token}`)
      .expect((res) => {
        const { status, body } = res;
        try {
          expect(status).toBe(404);
          expect(body).toHaveProperty('error', 'usuario nao encontrado');
        } catch (error) {
          throw new Error(`
                \n${status}\n
                \n${formatObject(body)}\n
                \n${error}\n
       `);
        }
      });
  });

  it('200: deve dar certo se o token for valido e o usuario existir', async () => {
    const result = await pool.query(`
        INSERT INTO users (id, username, password)
        VALUES (10, 'tales', '123')
        RETURNING *
        `);
    const user = result.rows[0];
    const token = signJWT({
      id: user.id,
    });

    await supertest(test_app)
      .post(path)
      .set('Authorization', `Bearer ${token}`)
      .expect((res) => {
        const { status, body } = res;
        body.created_at = new Date(body.created_at);
        try {
          expect(status).toBe(200);
          expect(body).toEqual(user);
        } catch (error) {
          throw new Error(`
                \n${status}\n
                \n${formatObject(body)}\n
                \n${error}\n
       `);
        }
      });
  });

  it('400: id abaixo de 0 ou 0 deve ser invalido', async () => {
    for (let id = -3; id <= 0; id++) {
      const token = signJWT({ id: id });
      await supertest(test_app)
        .post(path)
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {
          const { status, body } = res;
          try {
            expect(status).toBe(400);
            expect(body).toHaveProperty('error', 'id invalido');
          } catch (err) {
            throw new Error(`
                \n${status}\n
                \n${formatObject(body)}\n
                \n${err}\n
       `);
          }
        });
    }
  });
});
