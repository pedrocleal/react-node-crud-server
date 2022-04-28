const express = require('express');
const routes = require('./routes');

const server = express();

server.use(express.json());
server.use(routes);

server.listen(3030, () => {
  console.log('Server is listening on http://localhost:3030');
});
