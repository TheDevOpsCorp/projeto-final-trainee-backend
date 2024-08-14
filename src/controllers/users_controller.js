/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

export default {
  /**
   * @param {Request} req
   * @param {Response} res
   * */

  async login(req, res) {
    
    const { password, username } = req.body;

    if (!password || !username) {
      return res.json({
        error: 'password not provided',
      });
    }
  },
};
