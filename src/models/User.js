const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 50,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    min: 5,
    max: 150,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 255,
  },
  adoptedPets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pet',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;

    delete returnedObject.password;
  },
});

const User = model('User', userSchema);

module.exports = User;
