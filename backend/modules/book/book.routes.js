const express = require("express");
const { bookControllerObj } = require("../book/book.controllers");
const router = express.Router();

//@desc Get All Books
//@Route /api/v1/books
router.get("/books", bookControllerObj.getAllBooks);

//@desc Add/Create New Book
//@Route /api/v1/book/new
router.post("/books/new", bookControllerObj.createNewBook);

module.exports = router;
