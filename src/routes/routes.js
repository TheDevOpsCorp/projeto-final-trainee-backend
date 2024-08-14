import { Router } from "express";
import users_controller from "../controllers/users_controller.js";


const  router = Router()

router.post('/usuario/login', users_controller.login)

export default router