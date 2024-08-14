import supertest from 'supertest';
import app from '../../src/index.js';
import { truncateUsersTable } from '../../src/database/trucate.js';

beforeEach(async () => {
    await truncateUsersTable();
});

afterEach(async () => {
    await truncateUsersTable();
});

describe ("POST /usuario/login login", ()=>{

    it('Status 200: A rota deve verificar os dados e liberar o acesso', async ()=>{

        const body = {
            user_name: 'tales',
            password: '123'            
        }

        await supertest(app)
        .post('/post')
        .send(body)
        .expect((res)=>{

            

        })

    })

})
