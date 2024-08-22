// middlewares/authMiddleware.js
/**
 *
 * @param {*} req
 *
 * @param {*} next
 */
const autenticador_user = (req, /** @type {any} */ res, next) => {
  req.user = req.user || {};
  req.user.id = 1; 

  next();
};

export { autenticador_user };
