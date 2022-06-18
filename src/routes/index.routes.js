const indexRouters = require('express').Router();

indexRouters.get('/', (req, res) => {
  res.send('<h1>Bienvenido a la API de Taller Distribuidos</h1>');
});

module.exports = indexRouters;
