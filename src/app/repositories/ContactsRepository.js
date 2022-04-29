// Fonte de dados que serve como "repositório" para ser consultado por outros módulos e retornar dados
const db = require('../../database/index');

class ContactsRepository {
  async findAll(orderBy = 'ASC') {
    // Não é necessário a desestructuring na const rows pois quero mais de um registro

    const order = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await db.createQuery(`
      SELECT * FROM contacts_list ORDER BY name ${order}
    `);

    return rows;
  }

  async findById(id) {
    const [row] = await db.createQuery(`
      SELECT * FROM contacts_list 
      WHERE id = $1
    `, [id]);

    return row;
  }

  async create({ name, phone }) {
    // Como eu irei usar os dados do último registro, é necessário a desestruturação

    const [row] = await db.createQuery(`
      INSERT INTO contacts_list(name, phone) 
      VALUES($1, $2) 
      RETURNING *
    `, [name, phone]);

    return row;
  }

  async update({ name, id, phone }) {
    const [row] = await db.createQuery(`
      UPDATE contacts_list
      SET name = $1, phone = $2
      WHERE id = $3
      RETURNING *
    `, [name, phone, id]);

    return row;
  }

  async delete(id) {
    const row = await db.createQuery(`
      DELETE FROM contacts_list
      WHERE id = $1
    `, [id]);

    return row;
  }
}

module.exports = new ContactsRepository();
