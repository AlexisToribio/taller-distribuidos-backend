const yup = require('yup');

const userRegisterSchema = yup.object().shape({
  firstname: yup.string().min(1).max(100).required(),
  lastname: yup.string().min(1).max(100).required(),
  email: yup.string().email().min(5).max(150).required(),
  password: yup.string().min(8).max(255).required(),
  adoptedPets: yup.array(),
});

const userModifySchema = yup.object().shape({
  firstname: yup.string().min(1).max(100),
  lastname: yup.string().min(1).max(100),
  email: yup.string().email().min(5).max(150),
  password: yup.string().min(8).max(255),
});

const institutionRegisterSchema = yup.object().shape({
  name: yup.string().min(1).max(100).required(),
  email: yup.string().email().min(5).max(150).required(),
  password: yup.string().min(8).max(255).required(),
  address: yup.string().min(1).max(100).required(),
  uploadedPets: yup.array(),
});

const institutionModifySchema = yup.object().shape({
  name: yup.string().min(1).max(100),
  email: yup.string().email().min(5).max(150),
  password: yup.string().min(8).max(255),
  address: yup.string().min(1).max(100),
  uploadedPets: yup.array(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().min(5).max(150).required(),
  password: yup.string().min(8).max(255).required(),
});

const petRegisterSchema = yup.object().shape({
  code: yup.string().required(),
  name: yup.string().min(1).max(100).required(),
  date: yup.string().required(),
  size: yup.string().strict().required(),
  activity: yup.string().strict().required(),
  gender: yup.string().strict().required(),
  description: yup.string().min(1).max(255).required(),
  img: yup.string().required(),
  institution: yup.string(),
  owner: yup.string(),
});

const petModifySchema = yup.object().shape({
  code: yup.string(),
  name: yup.string().min(1).max(100),
  date: yup.string(),
  size: yup.string().strict(),
  activity: yup.string().strict(),
  gender: yup.string().strict(),
  description: yup.string().min(1).max(255),
  img: yup.string(),
});

const requestSchema = yup.object().shape({
  address: yup.string().min(1).max(255).required(),
  phone: yup.string().min(1).max(20).required(),
  country: yup.string().min(1).max(50).required(),
  postal: yup.string().min(1).max(50).required(),
  application_date: yup.string().required(),
  check_date: yup.string(),
  status: yup.string(),
});

const checkRequestSchema = yup.object().shape({
  status: yup.string().required(),
  check_date: yup.string().required(),
});

module.exports = {
  userRegisterSchema,
  institutionRegisterSchema,
  loginSchema,
  petRegisterSchema,
  petModifySchema,
  userModifySchema,
  institutionModifySchema,
  requestSchema,
  checkRequestSchema,
};
