import {Router} from 'express'
import app from '../App.js'
import { registerUser,loginUser, logOut, updateDetails, updatePassword } from '../controllers/user.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import { getAuth } from '../middleware/auth.middleware.js';
import { checkUser } from '../utils/checkUser.js';
import { changeAvatar } from '../controllers/user.controller.js';
import { oneUser } from '../getData/oneUser.js';

const router=Router();
router.route("/register").post(
    upload.fields([
        {
    name:"avatar",
    maxCount:1
}
,{
    name:"coverImage",
    maxCount:1
}]),
    registerUser
)
router.route("/login").post(loginUser)
router.route("/getuser").get(checkUser)
router.route("/logout").post(getAuth,logOut)

router.route("/updatedetails").post(getAuth,updateDetails)
router.route("/updatepassword").post(getAuth,updatePassword)
router.route("/changeavatar").post(getAuth,
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        }

    ]),changeAvatar
)
router.route("/profile/:ownerId").get(oneUser)

    
    
export {router}

