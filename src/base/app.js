const express = require('express');
const cors = require('cors');

const env = require('./env');

const app = express();

app.use(cors());

app.set('port', env.PORT);

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

module.exports = app;
