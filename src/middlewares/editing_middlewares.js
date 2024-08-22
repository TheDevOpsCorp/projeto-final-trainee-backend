import pool from "../database/database.js";
/**
 *
 * @param {import ("express").Request} req
 * @param {import ("express").Response} res
 * @param {import ("express").NextFunction} next
 */
const autenticador_user = async (req, res, next) => {
  try {
    const user = req.body.user
    const data = await pool.query('SELECT username FROM users WHERE id = $1',[user]) 
  
    const user_DB = data.rows[0].username
    if (!user_DB) {
      return res.status(401).json({message: "não autorizado"})
    }
    next(); 
  } catch (error) {
    
  }

};

export { autenticador_user };
