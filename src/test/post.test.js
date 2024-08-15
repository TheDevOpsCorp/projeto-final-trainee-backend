import supertest from "supertest";
import app from "../index.js";


describe("POST /post", () => {
    it("criando dados no bd", async () => {
      let post = {
        title: "davi",
        body: "lucasemanoel",
        date:"2024-08-15 13:45:00"
      };
      await supertest(app)
        .post("/createpost")
        .send(post)
        .expect(201)
        .expect((res) => {
          try {
            let { message } = res.body;
            expect(message).toBe("post criado com sucesso");
          } catch (error) {
            throw new Error(`error ${res} 
                                   ${error}`);
          }
        });
    });
  
  });