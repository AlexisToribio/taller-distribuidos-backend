const {
  getAllPets,
  getPetById,
  registerPet,
} = require('../controllers/pets.controllers');
const validateUser = require('../middlewares/validateUser');

const petsRouter = require('express').Router();

petsRouter.get('/', getAllPets);

petsRouter.get('/:id', getPetById);

petsRouter.post('/register', validateUser, registerPet);

module.exports = petsRouter;
