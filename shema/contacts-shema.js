import Joi from "joi";
export const addContactShema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        favotite: Joi.boolean(),
})
export const addUpdateFavotiteShema = Joi.object({
    favorite: Joi.boolean().required(),
})

export default {
    addContactShema,
    addUpdateFavotiteShema,
}