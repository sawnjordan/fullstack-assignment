const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0.0,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  isbn: {
    type: Number,
    required: true,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = bookSchema;
// title, author, ISBN, price, and availability status.
