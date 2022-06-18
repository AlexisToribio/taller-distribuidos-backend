const authRouter = require('express').Router();
const {
  registerUser,
  registerInstitution,
  loginUser,
  loginInstitution,
} = require('../controllers/auth.controllers');

authRouter.post('/register-user', registerUser);

authRouter.post('/register-institution', registerInstitution);

authRouter.post('/login-user', loginUser);

authRouter.post('/login-institution', loginInstitution);

module.exports = authRouter;
