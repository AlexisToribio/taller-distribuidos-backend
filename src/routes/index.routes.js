const indexRouters = require('express').Router();

indexRouters.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

module.exports = indexRouters;
