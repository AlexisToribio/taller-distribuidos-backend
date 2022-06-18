const userRouter = require('express').Router();
const {
  getAllUsers,
  getUserById,
  modifyUser,
} = require('../controllers/user.controllers');
const validateUser = require('../middlewares/validateUser');

userRouter.get('/', getAllUsers);

userRouter.get('/:id', getUserById);

userRouter.put('/:id/edit', validateUser, modifyUser);

module.exports = userRouter;
