
import {listContacts, getContactById, addContact, removeContact} from './contacts.js';

import {Command} from 'commander';

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const res = await listContacts()
      console.table(res)
      break;
    case 'get':
      const resById = await getContactById(id)
      if (!resById) {
        console.log(null)
        break
      } 
      console.log(resById)
      break;

    case 'add':
      const addNewContact = await addContact(name, email, phone);
      console.log(addNewContact)
      break;

    case 'remove':
      const removeContactById = await removeContact(id);
      if (removeContactById.length === 0) {
        console.log(null)
        break;
      } 
      console.log(removeContactById)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);