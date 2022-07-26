const userRouter = require('express').Router();
const {
  getAllUsers,
  getAllInstitution,
  getUserById,
  getInstitutionById,
  modifyUser,
  getInfoUser,
} = require('../controllers/user.controllers');
const validateUser = require('../middlewares/validateUser');

userRouter.get('/', getAllUsers);

userRouter.get('/info', validateUser, getInfoUser);

userRouter.get('/institution', getAllInstitution);

userRouter.get('/:id', getUserById);

userRouter.put('/:id', validateUser, modifyUser);

module.exports = userRouter;
