const User = require('../models/User');
const Institution = require('../models/Institution');
const bcrypt = require('bcrypt');
const env = require('../base/env');
const jwt = require('jsonwebtoken');
const {
  userRegisterSchema,
  institutionRegisterSchema,
  loginSchema,
} = require('../utils/validations');

const loginUser = async (req, res, next) => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false });
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    user = user === null ? await Institution.findOne({ email }) : user;

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
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    next(err);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { userType } = req.body;
    if (userType === 'INSTITUTION') {
      await institutionRegisterSchema.validate(req.body, { abortEarly: false });
      const { name, address, email, password } = req.body;
      const userFound = await Institution.findOne({ email });
      if (userFound)
        return res
          .status(400)
          .json({ error: 'this email is already associated' });

      saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const institution = new Institution({
        name,
        address,
        email,
        password: passwordHash,
        createdAt: new Date(Date.now()).toLocaleString(),
        updatedAt: new Date(Date.now()).toLocaleString(),
      });

      const savedInstitution = await institution.save();

      res.status(201).json(savedInstitution);
    } else {
      await userRegisterSchema.validate(req.body, { abortEarly: false });
      const { firstname, lastname, email, password } = req.body;
      const userFound = await User.findOne({ email });
      if (userFound)
        return res
          .status(400)
          .json({ error: 'this email is already associated' });

      saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = new User({
        firstname,
        lastname,
        email,
        password: passwordHash,
        createdAt: new Date(Date.now()).toLocaleString(),
        updatedAt: new Date(Date.now()).toLocaleString(),
      });

      const savedUser = await user.save();

      res.status(201).json(savedUser);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
