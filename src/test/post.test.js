// @ts-ignore
import supertest from "supertest";
import app from "../index.js";
import pool from "../database/conection.js";


// @ts-ignore
describe("POST /posts", () => {
    // @ts-ignore
    it("201:post criado com sucesso", async () => {
      let user  = await pool.query('INSERT INTO users (username,password,created_at) VALUES (\'lucas\',\'lucas\',NOW()) RETURNING *')
      let post = {
        user_id:user.rows[0].id,
        title: "davi",
        body: "lucasemanoel",
      };
      console.log(post)
      await supertest(app)
        .post("/posts")
        .send(post)
        .expect(201)
        // @ts-ignore
        .expect((res) => {
          try {
            let { message } = res.body;
            // @ts-ignore
            expect(message).toBe("201 : post criado com sucesso");
          } catch (error) {
            throw new Error(`error ${res} 
                                   ${error}`);
          }
        });
    });

    // @ts-ignore
    it("400:faltando dados",async ()=>{
      let post = {
        user_id:2,
        title: "",
        body: "lucasemanoel",
        date:"2024-08-15 13:45:00"
      };
      await supertest(app)
        .post("/posts")
        .send(post)
        .expect(400)
        // @ts-ignore
        .expect((res) => {
          let { message } = res.body;
          // @ts-ignore
          expect(message).toBe("400 : preencha todos os dados");
        });

      
    })

    it("400:id invalido",async ()=>{
      let post = {
        user_id:-1,
        title: "ola",
        body: "lucasemanoel",
      };
      await supertest(app)
        .post("/posts")
        .send(post)
        .expect(400)
        // @ts-ignore
        .expect((res) => {
          let { message } = res.body;
          // @ts-ignore
          expect(message).toBe("400 : id invalido");
        });

      
    })

    
  
  });
