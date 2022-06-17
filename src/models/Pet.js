const { Schema, model } = require('mongoose');

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 50,
  },
  age: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 50,
  },
  breed: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 50,
  },
  sex: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 50,
  },
  img: {
    type: String,
    required: true,
  },
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
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
