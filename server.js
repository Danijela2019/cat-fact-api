const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes')

const server = express();
const port = process.env.PORT || 5000;


server.use(bodyParser.json());
server.use('/api/v1/catfacts',routes);

server.use((_req, _res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
server.use((error, _req, res, _next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
