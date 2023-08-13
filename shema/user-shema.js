import Joi from "joi";
export const registerShema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
})
export const loginShema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
})
