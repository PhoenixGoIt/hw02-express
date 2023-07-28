import Contact from '../models/contacts.js'
import { HttpError } from '../helpers/HttpError.js'
import ctrlWrapper from '../helpers/ctrlWrapper.js'


export const getAll =  async (req, res) => {
    const result = await Contact.find()
    res.json(result)
}

export const add = async (req, res) => {
   const result = await Contact.create(req.body)
   res.status(201).json(result)
}

export const getById = async (req, res) => {
    const id = req.params.contactId
    const result = await Contact.findById(id)
    if(!result) {
      throw HttpError(404, 'Not Found')
    }
    res.status(200).json(result)
}

export const del = async (req, res) => {
  const id = req.params.contactId
  const result = await Contact.findByIdAndDelete(id)
  if(!result) {
    throw HttpError(404, 'Not Found')
  }
  res.status(200).json({message:"contact deleted"})
}

export const updateById = async (req, res) => {
  const id = req.params.contactId
  const result = await Contact.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
  if(!result) {
    throw HttpError(404, 'Not Found')
  }
  res.status(200).json(result)
}
export const patchById = async (req, res) => {
  const id = req.params.contactId
  const result = await Contact.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
  if(!result) {
    throw HttpError(404, 'Not Found')
  }
  res.status(200).json(result)
}
const ctrl = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add), 
    del: ctrlWrapper(del),
    updateById: ctrlWrapper(updateById),  
    patchById: ctrlWrapper(patchById), 
};
export default ctrl