import contactsService from '../models/contacts.js'
import Joi from 'joi'
import { HttpError } from '../helpers/HttpError.js'
import ctrlWrapper from '../helpers/ctrlWrapper.js'

const addShema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
})
export const getAll =  async (req, res) => {
    const result = await contactsService.listContacts()
    res.status(200)
    res.json(result)
  }

export const getById = async (req, res) => {
     const id = req.params.contactId
     const result = await contactsService.getContactById(id)
     if(!result) {
       throw HttpError(404, `Not found`)
     }
     res.status(200)
     res.json(result)
    }

 export const add = async (req, res) => {
        const { name, email, phone } = req.body
	    if (!name && !email && !phone) {
		throw HttpError(400, 'missing fields')
	    }
        const {error} = addShema.validate(req.body)
        if(error) {
            throw HttpError(400, `missing required ${error.details[0].path} field`)
        }
      const result = await contactsService.addContact(req.body)
      if(!result) {
        throw HttpError(404, `Not found`)
      }
      res.status(201).json(result)
    }

export const del = async (req, res) => {
      const id = req.params.contactId
      const result = await contactsService.removeContact(id)
      if(!result) {
        throw HttpError(404, `Not found`)
      }
      res.status(201).json(res.json({"message": "contact deleted"}))
    }
export const update = async (req, res) => {
    const { name, email, phone } = req.body
	    if (!name && !email && !phone) {
		throw HttpError(400, 'missing fields')
	    }
        const {error} = addShema.validate(req.body)
        if(error) {
            throw HttpError(400, `missing required ${error.details[0].path} field`)
        }
      const id = req.params.contactId
      const result = await contactsService.updateContact(id, req.body)
    if(!result) {
      throw HttpError(404, `Not found`)
    }
    res.status(200)
    res.json(result)
    }
const ctrl = {
    getAll: ctrlWrapper(getAll),
    getById:ctrlWrapper(getById),
    add:ctrlWrapper(add),
    del:ctrlWrapper(del),
    update:ctrlWrapper(update),
};
export default ctrl