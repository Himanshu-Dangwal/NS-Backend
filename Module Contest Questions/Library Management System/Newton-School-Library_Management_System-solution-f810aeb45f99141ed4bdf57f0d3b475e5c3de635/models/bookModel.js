const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
  },
  copiesAvailable: {
    type: Number,
    default: 1,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
