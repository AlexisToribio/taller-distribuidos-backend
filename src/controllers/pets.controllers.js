const Pet = require('../models/Pet');
const User = require('../models/User');

const getAllPets = async (req, res) => {
  const pet = await Pet.find({})
    .populate('user', { uploadedPets: 0, adoptedPets: 0 })
    .populate('owner', { uploadedPets: 0, adoptedPets: 0 });

  res.json(pet);
};

const getPetById = (req, res, next) => {
  const { id } = req.params;

  Pet.findById(id)
    .then((pet) => (pet ? res.json(pet) : res.status(404).end()))
    .catch((err) => next(err));
};

const registerPet = async (req, res, next) => {
  const content = req.body;
  const { userId } = req;

  const user = await User.findById(userId);

  if (!content) {
    return res.status(400).json({
      error: 'no content',
    });
  }

  const newPet = new Pet({ ...content, user: user._id });

  try {
    const savedPet = await newPet.save();

    user.uploadedPets = user.uploadedPets.concat(savedPet._id);
    await user.save();

    res.json(savedPet);
  } catch (err) {
    next(err);
  }
};

const adoptPet = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;

  const pet = await Pet.findById(id);
  const user = await User.findById(userId);

  try {
    user.adoptedPets = user.adoptedPets.concat(pet._id);
    pet.owner = userId;
    await user.save();
    await pet.save();
    res.json({ message: 'Adopción exitosa' });
  } catch (err) {
    next(err);
  }
};

const modifyPet = (req, res, next) => {
  const { id } = req.params;
  const { name, age, size, breed, sex, img } = req.body;

  const newPet = {
    name,
    age,
    size,
    breed,
    sex,
    img,
  };

  Pet.findByIdAndUpdate(id, newPet, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch(next);
};

const deletePet = (req, res, next) => {
  const { id } = req.params;

  Pet.findByIdAndDelete(id).then((result) =>
    result === null ? res.sendStatus(404) : res.status(204).end()
  );
};

module.exports = {
  getAllPets,
  getPetById,
  registerPet,
  adoptPet,
  modifyPet,
  deletePet,
};
