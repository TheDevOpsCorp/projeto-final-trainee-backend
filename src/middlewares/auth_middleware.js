/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 *
 */

import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { decodeJWT, getToken } from '../helpers/auth.js';

export default {
    /**
     *
     *
     * @param {Request} req
     * @param {Response} res
     * @param {Function} next
     * @async
     */
    async authenticatJWT(req, res, next) {
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
    },
};
