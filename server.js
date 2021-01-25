const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes');


const server = express();
const port = process.env.PORT || 5000;

server.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/catfacts', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('Connection error happened', err)
})
db.once('open', ()=> {
    console.log('Db connection OPEN');

});

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
