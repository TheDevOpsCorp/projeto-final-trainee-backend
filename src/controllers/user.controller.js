import { pool } from "../database/database.js";
import bcrypt from "bcrypt";

export default {
  /**
   * @param {import ("express").Response} res
   * @param {import ("express").Request} req
   */

  signIn: async function (req, res) {
    try {
      return res.status(400).json("test 200 pass");
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
