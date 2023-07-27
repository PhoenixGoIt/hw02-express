import express from 'express'
import ctrl from '../../controllers/contacts.js'
const router = express.Router()

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', ctrl.add)

router.delete('/:contactId', ctrl.del)

router.put('/:contactId', ctrl.update)

export default router
