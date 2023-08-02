import React, { useEffect, useState } from "react";
import { MetaData } from "./layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchBooks } from "../features/book/booksSlices";
import { Book } from "./book/Book";
import { Loader } from "./layout/Loader";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";

export const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  let { loading, books, count, resPerPage, totalBooks, error } = useSelector(
    (state) => state.books
  );

  const { keyword } = useParams();
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
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);

  useEffect(() => {
    dispatch(fetchBooks({ keyword, currentPage }));
  }, [dispatch, currentPage, error, keyword]);

  function setCurrentPageNum(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <>
      <div className="container container-fluid">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 id="products_heading">Latest Books</h1>
            <MetaData title="Buy Best Book Online"></MetaData>
            <section id="products" className="container mt-5">
              <div className="row">
                {books?.map((book) => (
                  <Book key={book._id} book={book} />
                ))}
              </div>
            </section>
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={parseInt(resPerPage)}
                totalItemsCount={parseInt(count)}
                onChange={setCurrentPageNum}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
