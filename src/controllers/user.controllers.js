const User = require('../models/User');
const Institution = require('../models/Institution');
const {
  userModifySchema,
  institutionModifySchema,
} = require('../utils/validations');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).populate('adoptedPets', { owner: 0 });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const getAllInstitution = async (req, res, next) => {
  try {
    const users = await Institution.find({}).populate('uploadedPets', {
      institution: 0,
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) =>
      user
        ? res.json(user)
        : Institution.findById(id).then((institution) =>
            institution
              ? res.json(institution)
              : res.status(404).json({ error: 'Usuario no encontrado' }).end()
          )
    )
    .catch(next);
};

const modifyUser = async (req, res, next) => {
  try {
    await userModifySchema.validate(req.body, { abortEarly: false });
    const { id } = req.params;
    const { firstname, lastname, img, phone, sex } = req.body;

    const newUser = {
      firstname,
      lastname,
      img,
      phone,
      sex,
      updatedAt: new Date(Date.now()).toLocaleString(),
    };

    User.findByIdAndUpdate(id, newUser, { new: true })
      .then((user) => res.json(user))
      .catch(next);
  } catch (err) {
    next(err);
  }
};

const modifyInstitution = async (req, res, next) => {
  try {
    await institutionModifySchema.validate(req.body, { abortEarly: false });
    const { id } = req.params;
    const { name, img, phone, address } = req.body;

    const newInstitution = {
      name,
      img,
      phone,
      address,
      updatedAt: new Date(Date.now()).toLocaleString(),
    };

    Institution.findByIdAndUpdate(id, newInstitution, { new: true })
      .then((institution) => res.json(institution))
      .catch(next);
  } catch (err) {
    next(err);
  }
};

const getInfoUser = (req, res, next) => {
  const { userId } = req;

  User.findById(userId)
    .then((user) =>
      user
        ? res.json(user)
        : Institution.findById(userId).then((institution) =>
            institution
              ? res.json(institution)
              : res.status(404).json({ error: 'Usuario no encontrado' }).end()
          )
    )
    .catch(next);
};

module.exports = {
  getAllUsers,
  getAllInstitution,
  getUserById,
  modifyUser,
  modifyInstitution,
  getInfoUser,
};
