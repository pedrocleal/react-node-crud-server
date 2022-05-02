const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const server = express();
server.use(express.json());
server.use(cors());
server.use(routes);

server.listen(3030, () => {
  console.log('Server is listening on http://localhost:3030');
});
