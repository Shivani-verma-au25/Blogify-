import {Router} from 'express'
import {verifyJWT} from '../middlewares/auth.middleware.js'
import { createPost } from '../controller/post.controller.js';
const router = Router()


router.route('/create-post').post( verifyJWT , createPost)

export default router ;