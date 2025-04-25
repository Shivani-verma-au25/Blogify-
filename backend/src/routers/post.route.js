import {Router} from 'express'
import {verifyJWT} from '../middlewares/auth.middleware.js'
import { createPost, deletePost, EditPost, getAllPosts, getPostfromUserCreate, updatePost } from '../controller/post.controller.js';
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

router.route('/all-users-posts/:id').get(verifyJWT , getPostfromUserCreate)
router.route('/delete-users-post/:id').post(verifyJWT , deletePost)
router.route('/edit-users-post/:id').post(verifyJWT , EditPost)



export default router ;