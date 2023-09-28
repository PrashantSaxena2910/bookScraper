const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  price: String,
  availability: String,
  rating: String,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
