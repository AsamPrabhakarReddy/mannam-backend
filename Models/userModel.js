const mongoose = require('mongoose');

const userModelSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  legalIssue: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,

  },
  phoneNumber: {
    type: String,
    required: true,

  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('userModel', userModelSchema);
