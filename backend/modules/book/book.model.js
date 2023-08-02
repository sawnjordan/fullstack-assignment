const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
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
      type: [String],
      required: true,
      trim: true,
    },
    isbn: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

module.exports = mongoose.model("Books", bookSchema);
// title, author, ISBN, price, and availability status.
