import {updatePostById,getPostByIdAndUserId,} from "../models/editing_models.js";

/**
 * Atualiza uma postagem pelo ID
 * @param {*} req - Requisição do clientey
 *
 * @param {*} res - Resposta do servidor
 * @returns
 */


const updateById = async (req, res) => {
  const { id_posts } = req.params;   // ID da postagem obtido dos parâmetros da URL
  const { title, body } = req.body; // Dados da postagem obtidos do corpo da requisição
  const user_id = req.user_id;     // ID do usuário autenticado
  

  if (!title || !body) {
    return res.status(400).json({ message: "Postagem não encontrada" });
  }
  try {
    
// Verifica se a postagem existe e se pertence ao usuário autenticado
    const post = await getPostByIdAndUserId(Number(id_posts), user_id);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Postagem não encontrada ou não autorizada" });
    }

    // Atualiza a postagem
    await updatePostById(id_posts, title, body, user_id);
    return res.status(200).json({ message: "Postagem editada com sucesso" });

    // Retorna a resposta com a postagem atualizada
  } catch (error) {
    console.error(error); // Exibe o erro completo no console
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    res.status(500).json({
      message: "Erro ao atualizar a postagem",
      error: errorMessage,
    });
  }
};

export { updateById };
