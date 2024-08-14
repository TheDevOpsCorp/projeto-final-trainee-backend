/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

import {
    ErrorNotFound,
    getUsersbyUserName,
} from '../database/users_queries.js';

export default {
    /**
     * @param {Request} req
     * @param {Response} res
     * */

    async login(req, res) {
        const { password, user_name } = req.body;

        if (!password || !user_name) {
            return res.status(400).json({
                error: 'password or user name not provided',
            });
        }

        let user;
        try {
            user = await getUsersbyUserName(user_name);
        } catch (err) {
            if (err instanceof ErrorNotFound) {
                return res.status(404).json({
                    error: 'user with given name does not exist',
                });
            }
            return res.status(500).json({
                error: 'could not get user',
                error_infos: err,
            });
        }
    },
};
