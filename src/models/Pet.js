const { Schema, model } = require('mongoose');

const petSchema = new Schema({
  codigo: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 50,
  },
  born: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    require: true,
  },
  size: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 50,
  },
  activity: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 50,
  },
  description: {
    type: String,
    require: true,
    trim: true,
    min: 1,
    max: 255,
  },
  img: {
    type: String,
    required: true,
  },
  institution: {
    type: Schema.Types.ObjectId,
    ref: 'Institution',
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

petSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Pet = model('Pet', petSchema);

module.exports = Pet;
