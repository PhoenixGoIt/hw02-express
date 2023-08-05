import Contact from '../models/contact.js'
import { HttpError } from '../helpers/HttpError.js'
import ctrlWrapper from '../helpers/ctrlWrapper.js'


 const getAll =  async (req, res) => {
  const {_id: owner} = req.user
  const {page = 1, limit = 10} = req.query
  const skip = (page -1) * limit
    const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "name email")
    res.json(result)
}

 const add = async (req, res) => {
  const {_id: owner} = req.user
   const result = await Contact.create({...req.body, owner})
   res.status(201).json(result)
}

 const getById = async (req, res) => {
    const id = req.params.contactId
    const result = await Contact.findById(id)
    if(!result) {
      throw HttpError(404, 'Not Found')
    }
    res.status(200).json(result)
}

 const del = async (req, res) => {
  const id = req.params.contactId
  const result = await Contact.findByIdAndDelete(id)
  if(!result) {
    throw HttpError(404, 'Not Found')
  }
  res.status(200).json({message:"contact deleted"})
}

 const updateById = async (req, res) => {
  const id = req.params.contactId
  const result = await Contact.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
  if(!result) {
    throw HttpError(404, 'Not Found')
  }
  res.status(200).json(result)
}
 const patchById = async (req, res) => {
  const id = req.params.contactId
  const result = await Contact.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
  if(!result) {
    throw HttpError(404, 'Not Found')
  }
  res.status(200).json(result)
}
export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add), 
  del: ctrlWrapper(del),
  updateById: ctrlWrapper(updateById),  
  patchById: ctrlWrapper(patchById), 
};