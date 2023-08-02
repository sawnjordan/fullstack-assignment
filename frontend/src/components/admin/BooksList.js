import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MetaData } from "../layout/MetaData";
import { toast } from "react-toastify";
import { fetchAdminBooks } from "../../features/book/booksSlices";
import { deleteBook } from "../../features/book/adminBookSlice";
import { Loader } from "../layout/Loader";
import { MDBDataTable } from "mdbreact";
import { Sidebar } from "./Sidebar";

export const BooksList = () => {
  const CLEAR_ERRORS = "CLEAR_ERRORS";
  const RESET_DELETE_BOOK = "RESET_DELETE_BOOK";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, books } = useSelector((state) => state.books);
  const {
    error: deleteError,
    book,
    isDeleted,
    message,
  } = useSelector((state) => state.adminBooks);

  useEffect(() => {
    dispatch(fetchAdminBooks());
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
    if (deleteError) {
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
    if (isDeleted) {
      navigate("/admin/books");
      toast(`${message}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch({ type: RESET_DELETE_BOOK });
    }
  }, [dispatch, error, isDeleted, deleteError]);

  const setBooks = () => {
    const data = {
      columns: [
        {
          label: "ID:",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    books.forEach((book) => {
      data.rows.push({
        id: book._id,
        name: book.title,
        price: `${book.price}`,
        stock: book.stock,
        actions: (
          <>
            <Link
              to={`/admin/book/${book._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              type="button"
              onClick={() => deleteHandler(book._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });
    return data;
  };
  const deleteHandler = (id) => {
    dispatch(deleteBook(id));
  };
  return (
    <>
      <MetaData title={"All Book"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          {loading ? (
            <Loader />
          ) : (
            <>
              <MDBDataTable
                data={setBooks()}
                className="px-3"
                bordered
                striped
                hover
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
