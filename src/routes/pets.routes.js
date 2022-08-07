const {
  getAllPets,
  getPetById,
  getPetByInstitutionId,
  registerPet,
  modifyPet,
  deletePet,
  sendRequest,
} = require('../controllers/pets.controllers');
const validateUser = require('../middlewares/validateUser');

const petsRouter = require('express').Router();

petsRouter.get('/', getAllPets);

petsRouter.get('/institution', validateUser, getPetByInstitutionId);

petsRouter.get('/:id', getPetById);

petsRouter.post('/register', validateUser, registerPet);

petsRouter.post('/:id/send-request', validateUser, sendRequest);

petsRouter.put('/:id', validateUser, modifyPet);

petsRouter.delete('/:id', validateUser, deletePet);

module.exports = petsRouter;
