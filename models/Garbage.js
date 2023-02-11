const mongoose = require('mongoose');

const GarbageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Please enter a valid first name.']
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Please enter a valid last name.']
  },
  description: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
    required: [true, 'Please enter a valid location.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Garbage', GarbageSchema);