/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 *
 */

import {
  decodeJWT,
  getToken,
  JsonWebTokenError,
  TokenExpiredError,
} from '../helpers/auth.js';
import pool from '../database/database.js';

export default {
  /**
   *
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   * @async
   */
  // @ts-ignore
  async authenticateJWT(req, res, next) {
    let token;
    try {
      token = getToken(req);
    } catch (err) {
      return res.status(401).json({
        error: 'invalido',
      });
    }

    let decoded;
    try {
      //@ts-ignore
      decoded = decodeJWT(token);
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(401).json({
          error: 'expirado',
        });
      }
      if (err instanceof JsonWebTokenError) {
        return res.status(401).json({
          error: 'invalido',
        });
      }
      return res.status(500).json({
        error: 'server error',
      });
    }

    // req.user = user
    try {
      // @ts-ignore
      let id = decoded.sub;
      let user = await pool.query('SELECT *FROM users WHERE id = $1 ', [id]);
      if (user.rows.length == 0) {
        return res.status(404).json({ error: 'usuario nao encontrado' });
      }
      // @ts-ignore
      req.user = user;
      next();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'não foi possivel pegar o usuario' });
    }
  },
};
