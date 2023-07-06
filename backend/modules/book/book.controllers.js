const MongoDBService = require("../../services/mongodb.service");
const bookSchema = require("./book.model");
const mongodbServiceObj = new MongoDBService();
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
      const { title, price, author, isbn, stock } = req.body;
      const newBook = await new bookSchema({
        title,
        price,
        author,
        isbn,
        stock,
      }).save();

      res.status(201).json({ status: 201, response: newBook });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getSingleBook = async (req, res, next) => {
    try {
      const bookID = req.params.id;
      const bookData = await bookSchema.findOne({ _id: bookID });

      res.status(200).json({ status: "success", response: bookData });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

const bookControllerObj = new BookController();
module.exports = { bookControllerObj, BookController };
