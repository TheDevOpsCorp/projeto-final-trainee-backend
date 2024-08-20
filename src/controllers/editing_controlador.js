import pool from "../database/database.js";
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */

const updateById = async (req, res) => {
  const { title, body } = req.body;
  const post_Id = req.params.id_post;

  if (!title || !body) {
    console.warn("Validação falhou: Título ou corpo estão vazios.");
    return res
      .status(400)
      .json({ message: "Título e corpo são obrigatórios." });
  }

  try {
    //atualiza postagem pelo id_post e id_user
    const query = `
      UPDATE posts
      SET title = $1, body = $2, updated_at = NOW()
      WHERE id = $3 AND user_id = $4
      RETURNING *;
     `;

    const values = [title, body, post_Id, req.user.id]; //executando a consulta
    const result = await pool.query(query, values); //resultado da consulta
    const updatedPost = result.rows[0];

    if (!updatedPost) {
      return res.status(404).json({
        message: "Postagem não encontrada.",
      });
    }

    return res
      .status(200)
      .json({ message: "Postagem editada com sucesso.", post: updatedPost });
    res.status(200).json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ocorreu um erro ao atualizar a postagem." });
  }
};

export { updateById };
