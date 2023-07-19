import React, { useEffect } from "react";
import { MetaData } from "./layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../features/book/booksSlices";
import { Book } from "./book/Book";
import { Loader } from "./layout/Loader";
import { toast } from "react-toastify";

export const Home = () => {
  const dispatch = useDispatch();
  const { loading, books, count, error } = useSelector((state) => state.books);
  if (!loading && error) {
    toast(`${error.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <>
      <div className="container container-fluid">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 id="products_heading">Latest Products</h1>
            <MetaData title="Buy Best Product Online"></MetaData>
            <section id="products" className="container mt-5">
              <div className="row">
                {books?.map((book) => (
                  <Book key={book._id} book={book} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
};
