const mongoose = require('mongoose');

const post = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  image: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'author',
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
});

module.exports = mongoose.model('post', post);
