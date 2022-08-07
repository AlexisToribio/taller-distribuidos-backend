const { Schema, model } = require('mongoose');

const institutionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    min: 5,
    max: 150,
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 255,
  },
  img: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
  },
  uploadedPets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pet',
    },
  ],
});

institutionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;

    delete returnedObject.password;
  },
});

const Institution = model('Institution', institutionSchema);

module.exports = Institution;
