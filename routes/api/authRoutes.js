import express from 'express'
import isValidId from '../../middlewares/isValidId.js'
import validateBody from '../../decorators/validateBody.js'
import {isEmptyBody} from '../../middlewares/isEmptyBody.js'
import { signinShema, signupShema } from '../../shema/user-shema.js'
import ctrl from '../../controllers/auth.js'
import authenticate from '../../middlewares/authenticate.js'
const authRouter = express.Router()

authRouter.post('/users/signup',isEmptyBody, validateBody(signupShema),  ctrl.signup)
authRouter.post('/users/signin',isEmptyBody, validateBody(signinShema),  ctrl.singin)
authRouter.get('/users/current',authenticate,  ctrl.currentUser)
authRouter.post('/users/logout',authenticate,  ctrl.logout)

export default authRouter
