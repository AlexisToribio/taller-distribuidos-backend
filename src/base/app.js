const express = require('express');
const cors = require('cors');

const env = require('./env');

const app = express();
const indexRoutes = require('../routes/index.routes');
const petsRoutes = require('../routes/pets.routes');
const authRoutes = require('../routes/auth.routes');

app.use(cors());
app.use(express.json());

app.set('port', env.PORT);

app.use('/', indexRoutes);
app.use('/pets', petsRoutes);
app.use('/auth', authRoutes);

module.exports = app;
