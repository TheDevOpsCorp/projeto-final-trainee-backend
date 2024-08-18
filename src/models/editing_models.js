import pool from "../database/database.js";

/**
 * Atualiza uma postagem pelo ID.
 *
 * @param {*} id_posts
 * @param {*} title
 * @param {*} body
 * @param {*} user_id
 * @returns
 */
const updatePostById = async (id_posts, title, body, user_id) => {
  const query = `
    UPDATE posts 
    SET title = $1, body = $2, updated_at = NOW() 
    WHERE id = $3 AND user_id = $4 
    RETURNING *;
    `;
  const values = [title, body, id_posts, user_id];
  try {
    const result = await pool.query(query, values);

    //se nenhuma linha foi afetada, postagem não encontrada ou usuario nao autorizado
   if(result.rows[0]===0){
    return null;
   }
   return result.rows[0];
  } catch (error) {
    throw error;
  }
};

/**
 * Recupera uma postagem pelo ID e ID do usuário.
 *
 * @param {*} id_posts
 * @param {*} user_id
 * @returns
 */
const getPostByIdAndUserId = async (id_posts, user_id) => {
  const query = "SELECT * FROM posts WHERE id = $1 AND user_id = $2";
  const values = [id_posts, user_id];
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export { getPostByIdAndUserId, updatePostById };
