import {Router} from 'express'
import { googleAuthLoginUser, googleLogOut } from '../controller/google.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
const router = Router()


router.route('/google/callback').post(googleAuthLoginUser)
router.route('/logout').post( verifyJWT, googleLogOut)


// router.route('/google/callback').post((req ,res) =>{
//      console.log("Callback hit");
// //   res.send("Success");
// }) 


router.post("/google/callback", (req, res) => {
  console.log("Callback hit");
  res.send("Success");
});

export default router;