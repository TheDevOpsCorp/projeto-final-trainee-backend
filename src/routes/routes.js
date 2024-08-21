import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.post("/user/signin", userController.signIn);

export default router;
