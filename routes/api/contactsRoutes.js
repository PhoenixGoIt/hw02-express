import express from 'express'
import ctrl from '../../controllers/contacts.js'
import isValidId from '../../middlewares/isValidId.js'
const router = express.Router()

router.get('/',  ctrl.getAll)

router.get('/:contactId', isValidId, ctrl.getById)

router.post('/', ctrl.add)

router.delete('/:contactId',isValidId, ctrl.del)

router.put('/:contactId',isValidId, ctrl.updateById)

export default router
