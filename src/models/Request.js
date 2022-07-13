const { Schema, model } = require('mongoose');

const requestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  pet: {
    type: Schema.Types.ObjectId,
    ref: 'Pet',
  },
  address: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 255,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 20,
  },
  country: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 50,
  },
  postal: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 50,
  },
  application_date: {
    type: String,
  },
  check_date: {
    type: String,
  },

  status: {
    type: String,
    trim: true,
  },
});

requestSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Request = model('Request', requestSchema);

module.exports = Request;
