// middlewares/authMiddleware.js
/**
 *
 * @param {*} req
 *
 * @param {*} next
 */
const autenticador_user = (req, /** @type {any} */ res, next) => {
  req.user = req.user || {};
  req.user.id = 1; // Isso deve ser substituído pela lógica real de autenticação

  next();
};

export { autenticador_user };
