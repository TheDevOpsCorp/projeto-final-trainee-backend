/**
 * Middleware de autenticação do usuário.
 * Verifica se o usuário está autenticado.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
 const autenticador_user = (req, res, next) => {
  if (!req.user) {
    return res.status(400).json({ message: "Usuário não autenticado" });
  }
  next();
};
export {autenticador_user};