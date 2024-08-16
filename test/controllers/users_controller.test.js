import supertest from 'supertest';
import app from '../../src/index.js';
//import { truncateUsersTable } from '../../src/database/trucate.js';
import { pool } from '../../src/database/database.js';
import { formatObject } from '../../src/helpers/general_helpers.js';

// beforeEach(async () => {
//     await truncateUsersTable();
// });

// afterEach(async () => {
//     await truncateUsersTable();
// });

describe('POST /usuario/login login', () => {
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
            .post('/usuario/login')
            .send(body)
            .expect((res) => {
                const { body, status } = res;
                try {
                    expect(status).toBe(200);
                } catch (err) {
                    throw new Error(`
                            body: \n${formatObject(body)}\n
                            status: \n${status}\n
                            erro: \n${err}\n
                            `);
                }
            });
    });
});
