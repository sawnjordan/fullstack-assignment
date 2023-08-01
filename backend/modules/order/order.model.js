const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    books: [
      {
        book: {
          type: mongoose.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentInfo: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
    },
    paidAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
    shippingAddress: [
      {
        address: {
          type: String,
          required: true,
        },
        phoneNumber: {
          type: String,
          required: true,
        },
      },
    ],
    orderStatus: {
      type: String,
      required: true,
      default: "Processing",
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
