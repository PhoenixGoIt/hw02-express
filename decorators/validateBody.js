import { HttpError } from "../helpers/HttpError.js"

const validateBody = shema => {
    const func = (req, res, next) => {
        const {error} = shema.validate(req.body)
        if(error){
            if(error.details[0].type ==='any.required') {
                next(HttpError(400, `missing required ${error.details[0].path} field`))
            }
            next(HttpError(400, error.message))
        }
        next()
    }
    return func
}
export default validateBody;