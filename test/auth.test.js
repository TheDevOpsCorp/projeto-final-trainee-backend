import supertest from 'supertest';
import test_app from './test.router.js';
import { signJWT } from '../src/helpers/auth.js';
import { formatObject } from '../src/helpers/general_helpers.js';

describe('AUTH TEST', () => {
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
            await supertest(test_app).post(path).set("Authorization",`Bearer ${token}`).expect((res)=>{
                const {status,body} = res
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
            })

         
         
    });

    it('401: token deve ser invalido', async () => {
           await supertest(test_app).post(path).set("Authorization",`Bearer lalaal`).expect((res)=>{
               const {status,body} = res
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
           })

        
        
   });
   it('404: Usuario nao encontrado', async () => {
    const token = signJWT({ id: 8 });
    await supertest(test_app).post(path).set("Authorization",`Bearer ${token}`).expect((res)=>{
        const {status,body} = res
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
    })

 
 
});
});
