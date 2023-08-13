import { HttpError } from '../helpers/HttpError.js'
import ctrlWrapper from '../helpers/ctrlWrapper.js'
import bcrypt from "bcryptjs"
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import "dotenv/config"
import gravatar from "gravatar"
import Jimp from 'jimp'
import path from 'path'
import fs from "fs/promises"
const {JWT_SECRET} = process.env
 const login = async (req, res) => {
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
    const token = jwt.sign(payload,JWT_SECRET)
    await User.findByIdAndUpdate(user._id, {token})
    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
            avatarURL: user.avatarURL,
        }
    })
 }
 const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(user) {
        throw HttpError(409, 'Email in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email.trim().toLowerCase(), {s: '100', r: 'x', d: 'retro'}, true)
    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL: avatarURL });

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
            avatarURL: avatarURL,
        }
    });
};
const currentUser = async (req, res) => {
    const {email, subscription, avatarURL} = req.user
    if(!email && subscription) {
        throw HttpError(401)
    }
    res.json({
        email: email,
        subscription: subscription,
        avatarURL: avatarURL,
    })

}
const logout = async (req, res) => {
    const {_id} = req.user
    await User.findByIdAndUpdate(_id, {token: ""})
    res.status(204).json({})
}
const avatarPath = path.resolve("public", "avatars");

const updateAvatar = async (req, res) => {
        if(!req.file) {
            throw HttpError(404, "missing field Avatar")
        }
        const {_id} = req.user
        const { path: oldPath, filename } = req.file;
        const newPath = path.join(avatarPath, filename);
        await fs.rename(oldPath, newPath);

        const avatarImage = await Jimp.read(newPath);
        avatarImage.resize(250, 250);
        await avatarImage.writeAsync(newPath);

        const avatarURL = path.join("public", "avatars", filename).replace(/\\/g, "/");
        console.log(avatarURL)
        await User.findByIdAndUpdate(_id, {avatarURL}, {runValidators: true, new: true})
        res.json({
            avatarURL: avatarURL,
        })
    }

export default {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    currentUser: ctrlWrapper(currentUser),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
}