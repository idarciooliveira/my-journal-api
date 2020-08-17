const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const user = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

user.pre('save', function (next) {
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  next();
});

module.exports = mongoose.model('user', user);
