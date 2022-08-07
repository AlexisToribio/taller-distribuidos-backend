const Pet = require('../models/Pet');
const User = require('../models/User');
const Request = require('../models/Request');
const Institution = require('../models/Institution');
const {
  petRegisterSchema,
  petModifySchema,
  requestSchema,
} = require('../utils/validations');

const getAllPets = async (req, res, next) => {
  try {
    const pet = await Pet.find({})
      .populate('institution', { uploadedPets: 0 })
      .populate('owner', { adoptedPets: 0 });

    res.json(pet);
  } catch (err) {
    next(err);
  }
};

const getPetById = (req, res, next) => {
  const { id } = req.params;

  Pet.findById(id)
    .then((pet) =>
      pet
        ? res.json(pet)
        : res.status(404).json({ error: 'Mascota no encontrada' }).end()
    )
    .catch((err) => next(err));
};

const getPetByInstitutionId = async (req, res, next) => {
  try {
    const { userId } = req;
    const pet = await Pet.find({})
      .populate('institution', { uploadedPets: 0 })
      .populate('owner', { adoptedPets: 0 });
    console.log(pet);
    const petByInstitutionId = pet.filter(
      (re) => re.institution._id.toString() === userId
    );

    res.json({ pet: petByInstitutionId });
  } catch (err) {
    next(err);
  }
};

const registerPet = async (req, res, next) => {
  try {
    await petRegisterSchema.validate(req.body, { abortEarly: false });

    const content = req.body;
    const { userId } = req;

    const institution = await Institution.findById(userId);
    if (!content) {
      return res.status(400).json({
        error: 'no content',
      });
    }

    const newPet = new Pet({
      ...content,
      institution: institution._id,
      createdAt: new Date().toLocaleString(),
      uptatedAt: new Date().toLocaleString(),
    });

    const savedPet = await newPet.save();

    institution.uploadedPets = institution.uploadedPets.concat(savedPet._id);
    await institution.save();

    res.json(savedPet);
  } catch (err) {
    next(err);
  }
};

const modifyPet = async (req, res, next) => {
  try {
    await petModifySchema.validate(req.body, { abortEarly: false });

    const { id } = req.params;
    const {
      name,
      date,
      size,
      activity,
      gender,
      description,
      img,
      otherDetails = '',
    } = req.body;

    const newPet = {
      name,
      date,
      size,
      activity,
      gender,
      description,
      img,
      otherDetails,
      updatedAt: new Date().toLocaleString(),
    };
    Pet.findByIdAndUpdate(id, newPet, { new: true })
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};

const deletePet = (req, res, next) => {
  const { id } = req.params;

  Pet.findByIdAndDelete(id)
    .then((result) =>
      result === null ? res.sendStatus(404) : res.status(204).end()
    )
    .catch(next);
};

const sendRequest = async (req, res, next) => {
  try {
    await requestSchema.validate(req.body, { abortEarly: true });
    const { id } = req.params;
    const content = req.body;
    const { userId } = req;

    const user = await User.findById(userId);

    if (!content) {
      return res.status(400).json({
        error: 'no content',
      });
    }

    const newRequest = new Request({
      ...content,
      user: user._id,
      pet: id,
      status: 'Pendiente',
    });

    const savedRequest = await newRequest.save();

    res.json(savedRequest);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllPets,
  getPetById,
  getPetByInstitutionId,
  registerPet,
  modifyPet,
  deletePet,
  sendRequest,
};
