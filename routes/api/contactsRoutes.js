import express from 'express'
import ctrl from '../../controllers/contacts.js'
import isValidId from '../../middlewares/isValidId.js'
import validateBody from '../../decorators/validateBody.js'
import { addContactShema, addUpdateFavotiteShema } from '../../shema/contacts-shema.js'
import isEmptyBody from '../../middlewares/isEmptyBody.js'
import authenticate from '../../middlewares/authenticate.js'
const contactRouter = express.Router()

contactRouter.use(authenticate)

contactRouter.get('/',  ctrl.getAll)

contactRouter.get('/:contactId', isValidId, ctrl.getById)

contactRouter.post('/', isEmptyBody.isEmptyBody, validateBody(addContactShema), ctrl.add)

contactRouter.delete('/:contactId',isValidId, ctrl.del)

contactRouter.put('/:contactId',isEmptyBody.isEmptyBody, validateBody(addContactShema),isValidId, ctrl.updateById)

contactRouter.patch('/:contactId/favorite',isEmptyBody.isEmptyFavoritBody, validateBody(addUpdateFavotiteShema),isValidId, ctrl.patchById)
export default contactRouter
