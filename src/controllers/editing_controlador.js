

import pool from "../database/database.js";
import { getPostById } from "../models/editing_models.js";
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */

const updateById = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post_Id = req.params.id_post;
  
    const post = await getPostById(post_Id);
    
    if (!post) {
      return res.status(404).send({
        message: "Postagem não encontrada.",
      });
    }
  
    if (!title && !body) {
      return res
        .status(400)
        .json({ message: "Pelo menos um título ou corpo deve ser fornecido." });
    }
    post.title = title ? title : post.title;
    post.body = body ? body : post.body;
    //atualiza postagem pelo id_post e id_user
    const query = `
      UPDATE posts
      SET title = $1, body = $2, updated_at = NOW()
      WHERE id = $3 AND user_id = $4
      RETURNING *;
     `;

    const values = [post.title, post.body, post_Id, req.body.user];
    const result = await pool.query(query, values); //resultado da consulta
    const updatedPost = result.rows[0];

    return res.status(200).json({ message: "Postagem editada com sucesso.", post: updatedPost});
  } catch (erro) {
    if (erro instanceof Error) {
      console.error("Erro ao atualizar postagem:", erro.message); // Loga a mensagem de erro
      console.error("Detalhes do erro:", erro);
    }
    res
      .status(500)
      .json({ message: "Ocorreu um erro ao atualizar a postagem." });
  }
};

export { updateById };
