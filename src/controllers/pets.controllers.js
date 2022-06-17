const Pet = require('../models/Pet');
const User = require('../models/User');

const getAllPets = async (req, res) => {
  const pet = await Pet.find({}).populate('user', {
    pets: 0,
  });

  res.json(pet);
};

const getPetById = (req, res) => {
  const { id } = req.params;

  Pet.findById(id)
    .then((pet) => (pet ? res.json(pet) : res.status(404).end()))
    .catch((err) => console.error(err));
};

const registerPet = async (req, res) => {
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

    user.pets = user.pets.concat(savedPet._id);
    await user.save();

    res.json(savedPet);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllPets,
  getPetById,
  registerPet,
};
