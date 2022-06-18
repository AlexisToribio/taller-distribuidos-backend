const {
  getAllPets,
  getPetById,
  registerPet,
  modifyPet,
  deletePet,
} = require('../controllers/pets.controllers');
const validateUser = require('../middlewares/validateUser');

const petsRouter = require('express').Router();

petsRouter.get('/', getAllPets);

petsRouter.get('/:id', getPetById);

petsRouter.post('/register', validateUser, registerPet);

petsRouter.put('/:id/edit', validateUser, modifyPet);

petsRouter.delete('/:id/delete', validateUser, deletePet);

module.exports = petsRouter;
