import { pool } from "../database/database.js";
import bcrypt from "bcrypt";

export default {
  /**
   * @param {import ("express").Response} res
   * @param {import ("express").Request} req
   */

  signIn: async function (req, res) {
    try {
      const body = req.body;

      if (!body || !body.name || !body.password || !body.creAt) {
        return res
          .status(400)
          .json({ menssage: "400 - Bad request: Body incompleto" });
      }

      const checkSame = await pool.query(
        `SELECT 1 FROM "users" WHERE username = $1`,
        [body.name]
      );

      if (checkSame.rows.length > 0) {
        return res.status(409).json({
          menssage:
            "409 - Conflict: Já existe um usuário com esse nome, escolha um nome diferente.",
        });
      }

      const hashPassword = await bcrypt.hash(body.password, 10);

      const dbRes = await pool.query(
        'INSERT INTO "users" ("username", "password", "created_at") VALUES ($1, $2, $3) RETURNING *',
        [body.name, hashPassword, body.creAt]
      );

      if (dbRes.rows.length > 0) {
        console.log(
          `Log criação de usuário: \n${JSON.stringify(dbRes.rows[0])}\n\n`
        );
        return res
          .status(200)
          .json({ menssage: "200 - Sucess: Usuário inserido com sucesso!" });
      } else {
        return res.status(500).json({
          menssage: "500 - Internal server error: A inserção de dados falhou.",
        });
      }
    } catch (error) {
      if (error instanceof AggregateError) {
        error.errors.forEach((err) => {
          console.error(`Error: \n${err}\n`);
        });
      } else {
        console.error(`Error: \n${error}\n`);
      }
      return res.status(500).json(`Catch error: \n${error}\n`);
    }
  },
};
