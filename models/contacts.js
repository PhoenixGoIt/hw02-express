import path from 'path'
import fs from 'fs/promises'
import { nanoid } from 'nanoid'
import Joi from 'joi'
const contactsPath = path.resolve("models", "contacts.json")

export const listContacts = async () => {
 const data = await fs.readFile(contactsPath)
 return JSON.parse(data)
}

export const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);
  if (!result) {
    return null
  }
  return result;
}

export const removeContact = async (id) => {
  const contacts = await listContacts();
  const rew = contacts.find(item => item.id === id);
  const result = contacts.filter(contact => contact.id !== id);
  if (!rew) {
    return null
  }
  await fs.writeFile(contactsPath, JSON.stringify(result))
  return result;
}

export const addContact = async (body) => {
  const {name,email, phone} = body
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  const { error, value } = schema.validate({ name, email, phone });

  const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    }
    console.log(newContact)
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return newContact
}

export const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const rew = contacts.find(item => item.id === id);
  if (!rew) {
    return null
  }
  const  {name, email, phone } = body
  if(!name || !email || !phone) {
    return 400
  }
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  const { error, value } = schema.validate({ name, email, phone });

  const contact = contacts.find((contact) => {
    if (contact.id === id) {
      contact.name = value.name;
      contact.email = value.email;
      contact.phone = value.phone;
      console.log(`Contact with ID ${id} updated!`);
      return contact;
    }
  });
  
  return contact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}