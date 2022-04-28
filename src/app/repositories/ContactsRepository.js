// Fonte de dados que serve como "repositório" para ser consultado por outros módulos e retornar dados
const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Pedro',
    phone: '83983399533',
  },
  {
    id: v4(),
    name: 'Joabinho',
    phone: '83982033959',
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.id === id),
    ));
  }

  create({ name, phone }) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name,
        phone,
      };
      contacts.push(newContact);
      resolve(newContact);
    });
  }

  update({ name, id, phone }) {
    return new Promise((resolve) => {
      contacts = contacts.map((contact) => (contact.id === id
        ? {
          ...contact,
          name,
          phone,
        }
        : contact));
      resolve();
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactsRepository();
