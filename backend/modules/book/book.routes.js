const express = require("express");
const { bookControllerObj } = require("../book/book.controllers");
const router = express.Router();

//@desc Get All Books
//@Route /api/v1/books
router.get("/", bookControllerObj.getAllBooks);

//@desc Add/Create New Book
//@Route /api/v1/book/new
router.post("/new", bookControllerObj.createNewBook);

// //@desc Get single book details
// //@Route /api/v1/book/:id
// //@desc Update single book
// //@Route /api/v1/book/:id
// //@desc Delete single book
// //@Route /api/v1/book/:id
router
  .route("/:id")
  .get(bookControllerObj.getSingleBook)
  .put(bookControllerObj.updateSingleBook)
  .delete(bookControllerObj.updateSingleBook);

module.exports = router;
