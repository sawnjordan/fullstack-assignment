const express = require("express");
const { bookControllerObj } = require("../book/book.controllers");
const { isUserAuthenticated } = require("../../middleware/auth.middleware");
const { authServicesObj } = require("../auth/auth.services");
const router = express.Router();

//@desc Get All Books
//@Route /api/v1/books
router.get("/", bookControllerObj.getAllBooks);

//@desc Get All Books (Admin)
//@Route /api/v1/books/admin
router.get("/admin", bookControllerObj.getAllAdminBooks);

//@desc Add/Create New Book
//@Route /api/v1/book/new
router.post(
  "/new",
  isUserAuthenticated,
  authServicesObj.authorizeRole("admin"),
  bookControllerObj.createNewBook
);

//@desc Get single book details
//@Route /api/v1/book/:id
//@desc Update single book
//@Route /api/v1/book/:id
//@desc Delete single book
//@Route /api/v1/book/:id
router
  .route("/:id")
  .get(bookControllerObj.getSingleBook)
  .put(
    isUserAuthenticated,
    authServicesObj.authorizeRole("admin"),
    bookControllerObj.updateSingleBook
  )
  .delete(
    isUserAuthenticated,
    authServicesObj.authorizeRole("admin"),
    bookControllerObj.updateSingleBook
  );

module.exports = router;
