const bookModel = require("../book/book.model");

class OrderSerivces {
  updateStock = async (bookId, bookQuantity) => {
    const book = await bookModel.findById(bookId);
    book.stock = book.stock - bookQuantity;

    await book.save();
  };
}
const orderServiceObj = new OrderSerivces();
module.exports = { orderServiceObj, OrderSerivces };
