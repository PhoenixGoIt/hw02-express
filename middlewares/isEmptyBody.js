import { HttpError } from "../helpers/HttpError.js"

export const isEmptyBody = (req, res, next) => {
    const {length} = Object.keys(req.body)
    if(!length) {
        next(HttpError(400,"missing fields"))
    }
    next()
}
export const isEmptyFavoritBody = (req, res, next) => {
    const {length} = Object.keys(req.body)
    if(!length) {
        next(HttpError(400,"missing field favorite"))
    }
    next()
}
export default {
    isEmptyBody,
    isEmptyFavoritBody,
};