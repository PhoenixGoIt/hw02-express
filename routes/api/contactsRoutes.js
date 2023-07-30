import express from 'express'
import ctrl from '../../controllers/contacts.js'
import isValidId from '../../middlewares/isValidId.js'
import validateBody from '../../decorators/validateBody.js'
import { addContactShema, addUpdateFavotiteShema } from '../../shema/contacts-shema.js'
import isEmptyBody from '../../middlewares/isEmptyBody.js'
const router = express.Router()

router.get('/',  ctrl.getAll)

router.get('/:contactId', isValidId, ctrl.getById)

router.post('/', isEmptyBody, validateBody(addContactShema), ctrl.add)

router.delete('/:contactId',isValidId, ctrl.del)

router.put('/:contactId',isEmptyBody, validateBody(addContactShema),isValidId, ctrl.updateById)

router.patch('/:contactId/favorite',isEmptyBody, validateBody(addUpdateFavotiteShema),isValidId, ctrl.patchById)
export default router
