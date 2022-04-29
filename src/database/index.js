const { Client } = require('pg');

// Cria uma nova instancia do Client com os dados para a conexão ser bem sucedida!

const client = new Client({
  host: 'localhost',
  port: 5433,
  user: 'root',
  password: 'root',
  database: 'contacts',
});

client.connect(); // Estabelece a conexão com o banco de dados

// Criar função para executar as query
exports.createQuery = async (query, values) => {
  const { rows } = await client.query(query, values); // rows = vetor com os registros da tabela!
  return rows;
};
