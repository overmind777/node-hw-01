
import { nanoid } from 'nanoid';
import fs from 'node:fs/promises';
import path from 'node:path';


const contactsPath = path.resolve('db', 'contacts.json');

console.log(contactsPath)


export async function listContacts() {
  const data = await fs.readFile(contactsPath)
  return JSON.parse(data)
}

export async function getContactById(contactId) {
  const data = await listContacts();
  const res = data.find(item => item.id === contactId)
 
  return res || null
}
export async function addContact(name, email, phone) {
  const id = nanoid();
  const data = await listContacts();

  fs.writeFile(contactsPath, JSON.stringify([...data, {id, name, email, phone}]), (err) => {
    if (err) {
      throw new Error(err.message)
    }
  })
  return {id, name, email, phone}
}

export async function removeContact(contactId) {
  const data = await listContacts(contactId);
  const removedContact = data.filter(contact => contact.id === contactId)
  const result = data.filter(contact => contact.id !== contactId)
  fs.writeFile(contactsPath, JSON.stringify(result))
  return removedContact
}


