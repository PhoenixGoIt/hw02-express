import path from 'path'
import fs from 'fs/promises'
import { nanoid } from 'nanoid'
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
  const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    }
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return newContact
}

export const updateContact = async (id, body) => {
  if(!body) {
    console.log(123)
  }
  const contacts = await listContacts();
  const  {name, email, phone } = body
  const rew = contacts.find(item => item.id === id);
  if (!rew) {
    return null
  }

  const contact = contacts.find((contact) => {
    if (contact.id === id) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
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