import express from 'express'
import validateBody from '../../decorators/validateBody.js'
import {isEmptyBody} from '../../middlewares/isEmptyBody.js'
import { loginShema, registerShema} from '../../shema/user-shema.js'
import ctrl from '../../controllers/auth.js'
import authenticate from '../../middlewares/authenticate.js'
import upload from '../../middlewares/upload.js'
const authRouter = express.Router()

authRouter.post('/register',isEmptyBody, validateBody(registerShema),  ctrl.register)
authRouter.post('/login',isEmptyBody, validateBody(loginShema),  ctrl.login)
authRouter.get('/current',authenticate,  ctrl.currentUser)
authRouter.post('/logout',authenticate,  ctrl.logout)
authRouter.patch('/avatar', upload.single("avatar") , authenticate,  ctrl.updateAvatar)

export default authRouter
