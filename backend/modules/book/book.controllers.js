const MongoDBService = require("../../services/mongodb.service");
const mongodbServiceOjj = new MongoDBService();
class BookController {
  getAllBooks = (req, res, next) => {
    res.json({
      status: "success",
      msg: "This is GET route to show all books from Database.",
    });
  };
}

const bookControllerObj = new BookController();
module.exports = { bookControllerObj, BookController };
