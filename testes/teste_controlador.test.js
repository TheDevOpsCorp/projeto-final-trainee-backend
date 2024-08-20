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
        ["Post Original", "Este é o corpo original.", userId]
      );

      post_Id = postResponse.rows[0].id;
    } catch (error) {
      // @ts-ignore
      console.error("Error ao criar postagem", error.message);
    }
  });

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
    expect(updatedPost.rows[0].updated_at).toBeTruthy(); // Verifica se o campo de data foi atualizado
  });

  test("Não deve permitir editar uma postagem sem titulo", async () => {
    const response = await request(app)
      .patch(`/post/${post_Id}`)
      .send({ body: "Este é o corpo editado" });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Título e corpo são obrigatórios.");
  });
  test("Não deve permitir postagem sem corpo", async () => {
    const response = await request(app)
      .patch(`/post/${post_Id}`)
      .send({ title: "Este é o titulo editado" });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Título e corpo são obrigatórios.");
  });

  test("Não deve permitir editar uma postagem inexistente", async () => {
    const response = await request(app)
      .patch("/post/999999")
      .send({ title: "Post Editado", body: "Este é o corpo editado." });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Postagem não encontrada.");
  });

  afterAll(async () => {
    await pool.end(); // Fecha a conexão com o banco de dados
  });
});
