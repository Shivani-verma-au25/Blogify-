import {Router} from 'express'
import { checkRouter, getCurrentUSer, loginUser, logoutUser, registerUser } from '../controller/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router()



router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/get-current').get(verifyJWT,getCurrentUSer)
router.route('/logout').post( verifyJWT,logoutUser)




export default router;