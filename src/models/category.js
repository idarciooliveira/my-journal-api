const mongoose = require('mongoose');

const category = mongoose.Schema({
  description: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('category', category);
