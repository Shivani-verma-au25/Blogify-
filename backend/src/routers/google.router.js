import {Router} from 'express'
import { googleAuthLoginUser } from '../controller/google.controller.js'
const router = Router()


router.route('/google/callback').post(googleAuthLoginUser)
// router.route('/google/callback').post((req ,res) =>{
//      console.log("Callback hit");
// //   res.send("Success");
// }) 


router.post("/google/callback", (req, res) => {
  console.log("Callback hit");
  res.send("Success");
});

export default router;