import { getPostByIdAndUserId } from "../models/editing_models.js";

/**
 * Middleware de autenticação do usuário.
 * Verifica se o usuário está autenticado.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const autenticador_user = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }
  next();
};

/**
 * Middleware de autorização para verificar se o usuário é o proprietário da postagem.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const autorizar_post = async (req, res, next) => {
  const { id_posts } = req.params; // Obtém o ID da postagem dos parâmetros da rota
  const user_id = req.user.id; // Obtém o ID do usuário do objeto de requisição

  try {
    const post = await getPostByIdAndUserId(id_posts, user_id);
    if (!post) {
      return res
        .status(403)
        .json({
          message: "Acesso negado. Você não é o proprietário desta postagem.",
        });
    }
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware para tratamento de erros.
 *
 * @param {*} err
 * @param {*} _req
 * @param {*} res
 * @param {*} next
 */
export const erroHandler = (err, _req, res, next) => {
  console.error("Erro:", err.message || err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    message: err.message || "Erro interno no servidor",
    error: err, // Sempre exibe detalhes do erro
  });
}  