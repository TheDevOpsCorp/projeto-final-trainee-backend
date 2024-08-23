/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 *
 */
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env['JWT_SECRET'];
if (!JWT_SECRET) {
    process.exit(1);
}

const defaultExpirationDate = '1hr';

class TokenExpiredError extends Error { }

class JsonWebTokenError extends Error { }

/**
 *
 *
 * @param {String} token
 * @throws {JsonWebTokenError}
 * @throws {TokenExpiredError}
 */
function decodeJWT(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (/** @type {any}*/ err) {
        if (err?.name === 'TokenExpiredError') {
            throw new TokenExpiredError('token expirado');
        }
        if (err?.name === 'JsonWebTokenError') {
            throw new JsonWebTokenError('token invalido');
        }
        throw err;
    }
}

/**
 *
 * @param {Request} req
 * @throws {Error}
 */
function getToken(req) {
    const bearerToken = req.header('Authorization');
    if (!bearerToken) {
        throw new Error('sem token de autorização ou nome errado');
    }
    const headerDiv = bearerToken.split(' ');
    if (headerDiv[0] != 'Bearer' || headerDiv.length !== 2) {
        throw new Error('formato invalido');
    }
    return headerDiv[1];
}
/**
 *
 * @param {Object.<any, any>} payload
 * @param {jwt.SignOptions} [options={ expiresIn: defaultTokenExpiration }]
 * @returns {String}
 */
function signJWT(payload, options = {}) {
    options.expiresIn = options.expiresIn || defaultExpirationDate;
    options.subject = `${payload.id}`;
    payload.iat = Math.floor(Date.now() / 1000);
    return jwt.sign(payload, JWT_SECRET, options);
}

export { decodeJWT, getToken, TokenExpiredError, JsonWebTokenError, signJWT };
