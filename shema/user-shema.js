import Joi from "joi";
export const signupShema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
})
export const signinShema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
})