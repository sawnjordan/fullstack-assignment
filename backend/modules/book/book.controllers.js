const bookSchema = require("./book.model");
const { z } = require("zod");
const { bookServiceObj } = require("./book.services");
class BookController {
  getAllBooks = async (req, res, next) => {
    const books = await bookSchema.find();
    // console.log(books);
    res.json({
      status: "success",
      count: books.length,
      response: books,
    });
  };

  createNewBook = async (req, res, next) => {
    try {
      const bookData = req.body;

      const validData = bookServiceObj.validateBannerData(bookData);
      console.log(validData);
      const { title, price, author, isbn, stock } = req.body;
      const newBook = await new bookSchema({
        title,
        price,
        author,
        isbn,
        stock,
      }).save();

      res.status(201).json({ status: 201, response: newBook });
    } catch (err) {
      next(err);
    }
  };

  getSingleBook = async (req, res, next) => {
    try {
      const bookID = req.params.id;
      const book = await bookSchema.findOne({ _id: bookID });
      // console.log(book);

      if (!book) {
        return res.status(404).json({
          status: "Not Found",
          response: "Book Not Found.",
        });
      }

      res.status(200).json({ status: "success", response: book });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  updateSingleBook = async (req, res, next) => {
    try {
      const bookID = req.params.id;
      const book = await bookSchema.findOne({ _id: bookID });
      const bookData = req.body;
      // console.log(book);

      if (!book) {
        return res.status(404).json({
          status: "Not Found",
          response: "Book Not Found.",
        });
      }
      const updatedBook = await bookSchema.findByIdAndUpdate(bookID, bookData, {
        new: true,
        runValidators: true,
      });

      console.log(updatedBook);

      res.json({
        status: 200,
        msg: `Book Updated with Id: ${bookID}`,
        response: book,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  deleteSingleBook = async (req, res, next) => {
    try {
      const bookID = req.params.id;
      let response = await bookSchema.findOneAndDelete({ _id: bookID });
      // console.log(response);
      res.json({
        status: 200,
        msg: `Book: ${response.title} deleted.`,
        response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

const bookControllerObj = new BookController();
module.exports = { bookControllerObj, BookController };
