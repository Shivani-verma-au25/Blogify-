import {Router} from 'express'
import { googleAuthLoginUser } from '../controller/google.controller.js'
const router = Router()


router.route('/google').post(googleAuthLoginUser)

export default router;