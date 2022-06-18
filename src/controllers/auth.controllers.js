const User = require('../models/User');
const Institution = require('../models/Institution');
const bcrypt = require('bcrypt');
const env = require('../base/env');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    res.status(401).json({ error: 'invalid email or password' });
  }

  const userForToken = {
    id: user._id,
    email: user.email,
  };

  const token = jwt.sign(userForToken, env.TOP_SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  });

  res.send({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    token,
  });
};

const loginInstitution = async (req, res) => {
  const { email, password } = req.body;

  const institution = await Institution.findOne({ email });

  const passwordCorrect =
    institution === null
      ? false
      : await bcrypt.compare(password, institution.password);

  if (!(institution && passwordCorrect)) {
    res.status(401).json({ error: 'invalid email or password' });
  }

  const userForToken = {
    id: institution._id,
    email: institution.email,
  };

  const token = jwt.sign(userForToken, env.TOP_SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  });

  res.send({
    firstname: institution.firstname,
    lastname: institution.lastname,
    email: institution.email,
    token,
  });
};

const registerUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    firstname,
    lastname,
    email,
    password: passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
};

const registerInstitution = async (req, res) => {
  const { name, address, email, password } = req.body;

  saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const institution = new Institution({
    name,
    address,
    email,
    password: passwordHash,
  });

  const savedInstitution = await institution.save();

  res.status(201).json(savedInstitution);
};

module.exports = {
  registerUser,
  registerInstitution,
  loginUser,
  loginInstitution,
};
