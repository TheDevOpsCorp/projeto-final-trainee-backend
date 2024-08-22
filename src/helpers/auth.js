/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 *
 */
import jwt from 'jsonwebtoken';
const JWT_SECRET = `${process.env['JWT_SECRET']}`;

/**
 *
 *
 * @param {String} token
 * @param {jwt.VerifyOptions | undefined} [options={}]
 * @throws {JsonWebTokenError}
 * @throws {TokenExpiredError}
 */
function decodeJWT(token, options = undefined) {
    return jwt.verify(token, JWT_SECRET, options);
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
    if (headerDiv[0] != 'Bearer') {
        throw new Error('formato invalido');
    }
    return headerDiv[1];
}

export { decodeJWT, getToken };
