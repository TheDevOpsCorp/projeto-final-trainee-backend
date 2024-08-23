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
import { error } from 'console';

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
      if (Number(id) <= 0) {
        return res.status(400).json({ error: "id invalido"})
      }
      let result = await pool.query('SELECT * FROM users WHERE id = $1 ', [id]);
      if (result.rows.length == 0) {
        return res.status(404).json({ error: 'usuario nao encontrado' });
      }
      if (result.rows.length > 1) {
        console.log(`ERROR: Mais de um usuário foi encontrado com o id ${id}`);
        return res.status(500).json({
          error: 'Houve um erro no banco de dados ao autenticar o usuário',
        });
      }
      // @ts-ignore
      req.user = result.rows[0];
      next();
    } catch (err) {
      return res
        .status(500)
        .json({ error: 'não foi possivel pegar o usuario', error_infos: err });
    }
  },
};
