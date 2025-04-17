import {Router} from 'express'
import {verifyJWT} from '../middlewares/auth.middleware.js'
import { createPost, getAllPosts, updatePost } from '../controller/post.controller.js';
import {upload} from '../middlewares/mullter.middleware.js';

const router = Router()


router.route('/create-post').post( verifyJWT ,upload.fields([
    {
        name :  "postImage",
        maxCount : 5
    }
]) , createPost)

router.route('/all-posts').get(getAllPosts)
router.route('/update-post/:id').post(verifyJWT,upload.fields([
     {
        name :  "postImage",
        maxCount : 5
    }
]) , updatePost)

export default router ;