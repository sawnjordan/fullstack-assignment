import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MetaData } from "../layout/MetaData";
import { toast } from "react-toastify";
import { updateBook } from "../../features/book/adminBookSlice";
import { fetchBook } from "../../features/book/bookSlices";
import { Sidebar } from "./Sidebar";

export const UpdateBook = () => {
  const RESET_UPDATE_BOOK = "RESET_UPDATE_BOOK";
  const CLEAR_ERRORS = "CLEAR_ERRORS";
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState("");
  const [isbn, setIsbn] = useState("");
  const [authors, setAuthors] = useState([""]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    error: updateError,
    isUpdated,
    message,
  } = useSelector((state) => state.adminBooks);
  const { error, book } = useSelector((state) => state.book);
  const bookId = useParams().id;

  useEffect(() => {
    if (book && bookId !== book._id) {
      dispatch(fetchBook(bookId));
    } else {
      setTitle(book.title);
      setPrice(book.price);
      setStock(book.stock);
      setIsbn(book.isbn);
      setAuthors(book.author);
    }

    if (!loading && updateError) {
      const errorMessagesArray = error.message
        .split(",")
        .map((message) => message.trim());

      errorMessagesArray.forEach((errorMsg) => {
        toast(errorMsg, {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
      dispatch({ type: CLEAR_ERRORS });
    }
    if (error) {
      toast(`${error.message}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch({ type: CLEAR_ERRORS });
    }

    if (isUpdated) {
      navigate("/admin/books");
      toast(`Book Updated successfully.`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch({ type: RESET_UPDATE_BOOK });
      dispatch(fetchBook(bookId));
    }
  }, [dispatch, error, isUpdated, bookId, updateError, book]);

  const submitHandler = (e) => {
    e.preventDefault();
    const lastAuthor = authors[authors.length - 1];
    if (lastAuthor === "") {
      authors.pop();
    }
    const bookData = {
      title,
      price: parseFloat(price),
      author: authors,
      isbn,
      stock: parseInt(stock),
    };
    dispatch(updateBook({ id: bookId, bookData }));
  };
  const handleAuthorChange = (index, value) => {
    const updatedAuthors = [...authors];
    updatedAuthors[index] = value;
    setAuthors(updatedAuthors);
  };
  const handleAddAuthor = () => {
    if (authors[authors.length - 1] !== "") {
      setAuthors([...authors, ""]);
    }
  };

  return (
    <>
      <MetaData title={"Update Book"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <div className="wrapper my-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h1 className="mb-4">Update Book</h1>

              <div className="form-group">
                <label htmlFor="title_field">Title</label>
                <input
                  type="text"
                  id="title_field"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ marginBottom: "8px" }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="author_field">Author</label>
                {authors.map((author, index) => (
                  <input
                    key={index}
                    type="text"
                    id="author_field"
                    className="form-control"
                    value={author}
                    style={{ marginBottom: "12px" }}
                    onChange={(e) => handleAuthorChange(index, e.target.value)}
                  />
                ))}
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleAddAuthor}
                >
                  Add Author
                </button>
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="isbn_field">ISBN</label>
                <input
                  type="text"
                  id="isbn_field"
                  className="form-control"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="text"
                  id="stock_field"
                  className="form-control"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
