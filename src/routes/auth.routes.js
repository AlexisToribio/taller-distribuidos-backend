const authRouter = require('express').Router();
const { registerUser, loginUser } = require('../controllers/auth.controllers');

authRouter.post('/register', registerUser);

authRouter.post('/login', loginUser);

module.exports = authRouter;
