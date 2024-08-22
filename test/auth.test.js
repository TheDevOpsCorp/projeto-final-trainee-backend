import supertest from "supertest";
import test_app from "./test.router.js";


describe('AUTH TEST',()=>{
    const path = '/test/middlware/autenticaçao'

    it('401: token nao veio na autenticacao',()=>{
        supertest(test_app).post(path).send().expect((res)=>{
            const {status,body} = res
            try {
                expect(status).toBe(401)
                expect(body).toHaveProperty("error","invalido")

            } catch (error) {
                throw new Error(`${status}
                                 ${body}
                                 ${error}`)
            }
        })
    })
})