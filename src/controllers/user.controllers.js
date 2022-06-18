const User = require('../models/User');
const Institution = require('../models/Institution');

const getAllUsers = async (req, res) => {
  const users = await User.find({}).populate('adoptedPets', { owner: 0 });
  res.json(users);
};

const getAllInstitution = async (req, res) => {
  const users = await Institution.find({}).populate('uploadedPets', {
    institution: 0,
  });
  res.json(users);
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => (user ? res.json(user) : res.status(404).end()))
    .catch(next);
};

const getInstitutionById = async (req, res, next) => {
  const { id } = req.params;

  Institution.findById(id)
    .then((institution) =>
      institution ? res.json(institution) : res.status(404).end()
    )
    .catch(next);
};

const modifyUser = async (req, res, next) => {
  const { id } = req.params;
  const { firstname, lastname } = req.body;

  const newUser = {
    firstname,
    lastname,
  };

  User.findByIdAndUpdate(id, newUser, { new: true })
    .then((user) => res.json(user))
    .catch(next);
};

module.exports = {
  getAllUsers,
  getAllInstitution,
  getUserById,
  getInstitutionById,
  modifyUser,
};
