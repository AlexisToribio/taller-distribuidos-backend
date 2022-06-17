const authRouters = require('express').Router();
const {
  getAllUsers,
  register,
  login,
} = require('../controllers/auth.controllers');

authRouters.get('/', getAllUsers);

authRouters.post('/register', register);

authRouters.post('/login', login);

module.exports = authRouters;
