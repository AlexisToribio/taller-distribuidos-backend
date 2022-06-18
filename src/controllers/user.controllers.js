const User = require('../models/User');

const getAllUsers = async (req, res) => {
  const users = await User.find({})
    .populate('uploadedPets', { user: 0 })
    .populate('adoptedPets', { user: 0 });
  res.json(users);
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => (user ? res.json(user) : res.status(404).end()))
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
  getUserById,
  modifyUser,
};
