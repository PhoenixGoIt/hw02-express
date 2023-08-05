import { HttpError } from '../helpers/HttpError.js'
import ctrlWrapper from '../helpers/ctrlWrapper.js'
import bcrypt from "bcryptjs"
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import "dotenv/config"

const {JWT_SECRET} = process.env
 const singin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        throw HttpError(401, 'Email or password invalid!');
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw HttpError(401, 'Email or password invalid!');
    }
    const payload ={
        id: user._id,
    }
    const token = jwt.sign(payload,JWT_SECRET, {expiresIn: "23h"})
    await User.findByIdAndUpdate(user._id, {token})
    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    })
 }
 const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(user) {
        throw HttpError(409, 'Email in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription
        }
    });
};
const currentUser = async (req, res) => {
    const {email, subscription} = req.user
    if(!email && subscription) {
        throw HttpError(401)
    }
    res.json({
        email: email,
        subscription: subscription,
    })

}
const logout = async (req, res) => {
    const {_id} = req.user
    console.log(_id)
    await User.findByIdAndUpdate(_id, {token: ""})
    res.status(204).json({})
}
export default {
    signup: ctrlWrapper(signup),
    singin: ctrlWrapper(singin),
    currentUser: ctrlWrapper(currentUser),
    logout: ctrlWrapper(logout),
}