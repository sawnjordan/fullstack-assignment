import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MetaData } from "../layout/MetaData";
import { toast } from "react-toastify";
import { fetchAdminBooks } from "../../features/book/booksSlices";
import { Loader } from "../layout/Loader";
import { MDBDataTable } from "mdbreact";
import { Sidebar } from "./Sidebar";

export const BooksList = () => {
  const dispatch = useDispatch();
  const { loading, error, books } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchAdminBooks());
    if (!loading && error) {
      toast(`${error.message}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [dispatch, error]);

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
            <button className="btn btn-danger py-1 px-2 ml-2">
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });
    return data;
  };
  return (
    <>
      <MetaData title={"All Products"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">All Books</h1>
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
