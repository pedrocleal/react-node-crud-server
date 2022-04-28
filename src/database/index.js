const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5433,
  user: 'root',
  password: 'root',
  database: 'contacts',
});

client.connect();
