const express = require('express');
const cors = require('cors');

const env = require('./env');

const app = express();
const indexRoutes = require('../routes/index.routes');
const petsRoutes = require('../routes/pets.routes');
const authRoutes = require('../routes/auth.routes');
const userRoutes = require('../routes/user.routes');
const notFound = require('../middlewares/notFound');
const handleErrors = require('../middlewares/handleErrors');

app.use(cors());
app.use(express.json());

app.set('port', env.PORT);

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/pets', petsRoutes);
app.use('/user', userRoutes);

app.use(notFound);
app.use(handleErrors);

module.exports = app;
