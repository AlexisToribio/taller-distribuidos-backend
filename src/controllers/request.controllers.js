const Request = require('../models/Request');
const User = require('../models/User');
const Pet = require('../models/Pet');
const { checkRequestSchema } = require('../utils/validations');

const checkRequest = async (req, res, next) => {
  try {
    let message = '';
    await checkRequestSchema.validate(req.body, { abortEarly: true });

    const content = req.body;
    const { id } = req.params;

    if (!content) {
      return res.status(400).json({
        error: 'no content',
      });
    }

    if (content.status === 'Aceptado') {
      const requestFound = await Request.findById(id);

      const { user: userId, pet: petId } = requestFound;

      const petPromise = Pet.findById(petId);
      const userPromise = User.findById(userId);

      const [petFound, userFound] = await Promise.all([
        petPromise,
        userPromise,
      ]);

      if (userFound.adoptedPets.includes(petFound._id)) {
        message = 'Mascota ya adoptada';
      } else {
        userFound.adoptedPets = userFound.adoptedPets.concat(petFound._id);
        petFound.owner = userId;
        await Promise.all([petFound.save(), userFound.save()]);
        message = 'Adopción exitosa';
      }
    }

    if (content.status === 'Pendiente') {
      message = 'La solicitud aun debe ser revisada';
    }

    if (content.status === 'Rechazado') {
      message = 'Adopción rechazada';
    }

    Request.findByIdAndUpdate(id, content, { new: true })
      .then((request) => {
        res.json({ request, message });
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};

const getAllRequest = async (req, res, next) => {
  try {
    const request = await Request.find({}).populate('user').populate('pet');
    res.json(request);
  } catch (err) {
    next(err);
  }
};

module.exports = { checkRequest, getAllRequest };
