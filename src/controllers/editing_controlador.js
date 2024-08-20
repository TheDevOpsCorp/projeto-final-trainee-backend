// controllers/postController.js
import pool from "../database/database.js";
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
// Método para atualizar a postagem pelo ID
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
    const query = `
      UPDATE posts
      SET title = $1, body = $2, updated_at = NOW()
      WHERE id = $3 AND user_id = $4
      RETURNING *;
      
    `
    const values = [title, body, post_Id ,req.user.id];
    console.log("Executando consulta:", { query, values });

    const result = await pool.query(query, values);
    console.log("Resultado da consulta:", result);

    const updatedPost = result.rows[0];

    if (!updatedPost) {
      return res.status(404).json({
        message: "Postagem não encontrada.",
      });
    }
    return res.status(200).json({message: "Postagem editada com sucesso.", post:updatedPost})

    res.status(200).json(updatedPost);
  } catch (error) {
    
    console.error("erro ao atualizar postagem", error);
    res
      .status(500)
      .json({ message: "Ocorreu um erro ao atualizar a postagem." });
  }
};

export { updateById };
