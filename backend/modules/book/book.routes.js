const express = require("express");
const { bookControllerObj } = require("../book/book.controllers");
const router = express.Router();

router.get("/books", bookControllerObj.getAllBooks);
module.exports = router;
