import { Router } from "express";
import postController from '../controllers/post.controller.js';

const  router = Router()

router.post('/posts', postController.createPost)



export default router