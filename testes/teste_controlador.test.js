import request from "supertest";
import app from "../src/index.js";
import pool from "../src/database/database.js";

describe("Edição de Postagem", () => {
  /**
   * @type {any}
   */
  let post_Id;

  const userId = 1; 

  beforeAll(async () => {
    try {
      const postResponse = await pool.query(
        "INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3) RETURNING id",
        ["title original", "body original", userId]
      );

      post_Id = postResponse.rows[0].id;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error ao criar postagem", error.message);
      }
    }
  });

  describe("Edição de Título", () => {
    test("Deve permitir editar somente o título", async () => {
      const response = await request(app)
        .patch(`/post/${post_Id}`)
        .send({ title: "Post Editado" }); 

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Postagem editada com sucesso.");

      const updatedPost = await pool.query("SELECT * FROM posts WHERE id = $1", [
        post_Id,
      ]);
      expect(updatedPost.rows[0].title).toBe("Post Editado");
      expect(updatedPost.rows[0].body).toBe("body original"); // O corpo deve permanecer o mesmo
      expect(updatedPost.rows[0].updated_at).toBeTruthy(); // Verifica se o campo de data foi atualizado

      
      
    });
  });

  describe("Edição de Corpo", () => {
    test("Deve permitir editar somente o corpo", async () => {
      await pool.query("UPDATE posts SET title = $1 WHERE id = $2", [
        "title original", //com isso o title não chega com um Post Editado
        post_Id,
      ]);
      const response = await request(app)
        .patch(`/post/${post_Id}`)
        .send({ body: "Este é o corpo editado." });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Postagem editada com sucesso.");

      const updatedPost = await pool.query("SELECT * FROM posts WHERE id = $1", [
        post_Id,
      ]);
      expect(updatedPost.rows[0].title).toBe("title original"); 
      expect(updatedPost.rows[0].body).toBe("Este é o corpo editado."); 
      expect(updatedPost.rows[0].updated_at).toBeTruthy(); 
    });
  });

  describe("Edição Completa", () => {
    test("Deve editar uma postagem existente", async () => {
      const response = await request(app)
        .patch(`/post/${post_Id}`)
        .send({ title: "Post Editado", body: "Este é o corpo editado." });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Postagem editada com sucesso.");

      const updatedPost = await pool.query("SELECT * FROM posts WHERE id = $1", [
        post_Id,
      ]);
      expect(updatedPost.rows[0].title).toBe("Post Editado");
      expect(updatedPost.rows[0].body).toBe("Este é o corpo editado.");
      expect(updatedPost.rows[0].updated_at).toBeTruthy(); 
    });
  });

  describe("Validações de Edição", () => {
    test("Não deve permitir editar com campos vazios", async () => {
      const response = await request(app).patch(`/post/${post_Id}`).send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Pelo menos um título ou corpo deve ser fornecido."
      );
    });

    test("Não deve permitir editar uma postagem inexistente", async () => {
      const response = await request(app)
        .patch("/post/999999")
        .send({ title: "Post Editado", body: "Este é o corpo editado." });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Postagem não encontrada.");
    });
  });

  afterAll(async () => {
    await pool.end(); 
  });
});
