import { nanoid } from 'nanoid';
import fs from 'node:fs/promises';
import path from 'node:path';

const contactsPath = path.resolve('db', 'contacts.json');

console.log(contactsPath);

export async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const data = await listContacts();
  const res = data.find(item => item.id === contactId);

  return res || null;
}
export async function addContact(name, email, phone) {
  const id = nanoid();
  const data = await listContacts();

  fs.writeFile(
    contactsPath,
    JSON.stringify([...data, { id, name, email, phone }]),
    err => {
      if (err) {
        throw new Error(err.message);
      }
    }
  );
  return { id, name, email, phone };
}

export async function removeContact(contactId) {
  try {
    const data = await listContacts(contactId);
    const removedContactIndex = data.findIndex(
      contact => contact.id === contactId
    );

    if (removedContactIndex === -1) {
      throw new Error('Contact not found');
    }

    const removedContact = data.splice(removedContactIndex, 1)[0];

    await fs.writeFile(contactsPath, JSON.stringify(data));

    return removedContact;
  } catch (error) {
    return null;
  }
}
