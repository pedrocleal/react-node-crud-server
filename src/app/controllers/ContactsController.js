// Controller = consulta o repositório para retornar dados para a requisição

const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(req, res) {
    const contacts = await ContactsRepository.findAll();

    return res.json(contacts);
  }

  async show(req, res) {
    const { id } = req.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact does not exists' });
    }

    return res.json(contact);
  }

  async store(req, res) {
    const { name, phone } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!phone) {
      return res.status(400).json({ error: 'Phone is required' });
    }

    const contact = await ContactsRepository.create({ name, phone });

    return res.json(contact);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, phone } = req.body;

    const contactsExists = ContactsRepository.findById(id);

    if (!contactsExists) {
      return res.status(400).json({ error: 'Contacts does not exists' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!phone) {
      return res.status(400).json({ error: 'Phone is required' });
    }

    const updateContact = await ContactsRepository.update({ id, name, phone });

    return res.status(200).json(updateContact);
  }

  async delete(req, res) {
    const { id } = req.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact does not exists' });
    }

    await ContactsRepository.delete(id);

    return res.sendStatus(200);
  }
}

module.exports = new ContactController();
