import express from 'express'
import contactsService from '../../models/contacts.js'
import { nanoid } from 'nanoid'
const router = express.Router()
router.get('/', async (req, res, next) => {
  const result = await contactsService.listContacts()
  res.status(200)
  res.json(result)
  
})

router.get('/:contactId', async (req, res, next) => {
   try {
    const id = req.params.contactId
    const result = await contactsService.getContactById(id)
    if(!result) {
      res.status(404)
      res.json({message: "Not found"})
    }
    res.status(200)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const result = await contactsService.addContact(req.body)
    res.status(201).json(result)
  }
  catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId
  const result = await contactsService.removeContact(id)
  if(!result) {
    res.status(404)
    res.json({message: "Not found"})
    return
  }
  res.status(200)
  res.json({"message": "contact deleted"})
})

router.put('/:contactId', async (req, res, next) => {
  const id = req.params.contactId
  const result = await contactsService.updateContact(id, req.body)
  res.json(result)
})

export default router
