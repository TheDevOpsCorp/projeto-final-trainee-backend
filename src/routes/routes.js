import { Router } from "express";
 import { updateById } from "../controllers/editing_controlador.js";
import { autenticador_user } from "../middlewares/editing_middlewares.js";

const  router = Router()

router.patch("/post/:id_posts",autenticador_user, updateById);

export default router