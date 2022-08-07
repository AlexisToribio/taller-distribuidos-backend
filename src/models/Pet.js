const { Schema, model } = require('mongoose');

const petSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 50,
  },
  date: {
    type: String,
    required: true,
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
    required: true,
    trim: true,
    min: 1,
    max: 255,
  },
  history: {
    type: String,
    trim: true,
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
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
  otherDetails: {
    type: String,
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
