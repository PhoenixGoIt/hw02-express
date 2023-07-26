import express from 'express'
import contactsService from '../../models/contacts.js'
import { HttpError } from '../../helpers/HttpError.js'
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
      throw HttpError(404, `Contact with id(${id}) not found`)
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
    if(!result) {
      throw HttpError(404, `Contact with id(${id}) not found`)
    }
    if(result === 400) {
      throw HttpError(400, `missing required name field`)
    }
    res.status(201).json(result)
  }
  catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId
    const result = await contactsService.removeContact(id)
    if(!result) {
      throw HttpError(404, `Contact with id(${id}) not found`)
    }
    res.status(201).json(res.json({"message": "contact deleted"}))
  }
  catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId
  const result = await contactsService.updateContact(id, req.body)
  if(!result) {
    throw HttpError(404, `Contact with id(${id}) not found`)
  }
  if(result === 400) {
    throw HttpError(400, `missing required name field`)
  }
  res.status(200)
  res.json(result)
  }
  catch (error) {
    next(error)
  }
})

export default router
