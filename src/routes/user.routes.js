const userRouter = require('express').Router();
const {
  getAllUsers,
  getAllInstitution,
  getUserById,
  getInstitutionById,
  modifyUser,
} = require('../controllers/user.controllers');
const validateUser = require('../middlewares/validateUser');

userRouter.get('/', getAllUsers);

userRouter.get('/institution', getAllInstitution);

userRouter.get('/:id', getUserById);

userRouter.get('/institution/:id', getInstitutionById);

userRouter.put('/:id', validateUser, modifyUser);

module.exports = userRouter;
