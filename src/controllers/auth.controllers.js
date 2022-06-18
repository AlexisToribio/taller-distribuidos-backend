const User = require('../models/User');
const bcrypt = require('bcrypt');
const env = require('../base/env');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
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

const register = async (req, res) => {
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

module.exports = {
  register,
  login,
};
