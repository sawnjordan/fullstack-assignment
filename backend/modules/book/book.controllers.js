const BookModel = require("./book.model");
const { z } = require("zod");
const { bookServiceObj } = require("./book.services");
const { Helpers } = require("../../helpers/helpers");
class BookController {
  //api/v1/books?keyword=book&
  getAllBooks = async (req, res, next) => {
    try {
      // return next({ status: 404, msg: "error" });
      const queryStr = req.query;
      const resPerPage = queryStr.page;
      const count = await bookServiceObj.getTotalBookCount();
      // console.log(queryStr);
      const helper = new Helpers(BookModel.find(), queryStr)
        .searchBooks()
        .pagination(resPerPage);
      const books = await helper.query;
      res.json({
        status: "success",
        count,
        response: books,
        resPerPage,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  createNewBook = async (req, res, next) => {
    try {
      const bookData = req.body;

      const validData = bookServiceObj.validateBannerData(bookData);
      // console.log(validData);
      req.body.user = req.user.id;
      const { title, price, author, isbn, stock, user } = req.body;
      const newBook = await new BookModel({
        title,
        price,
        author,
        isbn,
        stock,
        user,
      }).save();

      res.status(201).json({ status: 201, response: newBook });
    } catch (err) {
      next(err);
    }
  };

  getSingleBook = async (req, res, next) => {
    try {
      const bookID = req.params.id;
      const book = await BookModel.findOne({ _id: bookID });
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
      const book = await BookModel.findOne({ _id: bookID });
      const bookData = req.body;
      // console.log(book);

      if (!book) {
        return res.status(404).json({
          status: "Not Found",
          response: "Book Not Found.",
        });
      }
      const updatedBook = await BookModel.findByIdAndUpdate(bookID, bookData, {
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
      // console.log(error);
      next(error);
    }
  };

  deleteSingleBook = async (req, res, next) => {
    try {
      const bookID = req.params.id;
      let response = await BookModel.findOneAndDelete({ _id: bookID });
      // console.log(response);
      res.json({
        status: 200,
        msg: `Book: ${response.title} deleted.`,
        response,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  };
}

const bookControllerObj = new BookController();
module.exports = { bookControllerObj, BookController };
