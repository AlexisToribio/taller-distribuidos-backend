const {
  getAllPets,
  getPetById,
  registerPet,
  adoptPet,
  modifyPet,
  deletePet,
} = require('../controllers/pets.controllers');
const validateUser = require('../middlewares/validateUser');

const petsRouter = require('express').Router();

petsRouter.get('/', getAllPets);

petsRouter.get('/:id', getPetById);

petsRouter.post('/register', validateUser, registerPet);

petsRouter.post('/:id', validateUser, adoptPet);

petsRouter.put('/:id', validateUser, modifyPet);

petsRouter.delete('/:id', validateUser, deletePet);

module.exports = petsRouter;
