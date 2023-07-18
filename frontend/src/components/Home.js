import React, { useEffect } from "react";
import { MetaData } from "./layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../features/book/bookSlices";

export const Home = () => {
  const dispatch = useDispatch();
  const { loading, books, count, error } = useSelector((state) => state.book);
  // console.log(books);
  // books.map((item) => console.log(item));
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <>
      <div className="container container-fluid">
        <h1 id="products_heading">Latest Products</h1>
        <MetaData title="Buy Best Product Online"></MetaData>
        <section id="products" className="container mt-5">
          <div className="row">
            {books?.map((book) => (
              <div key={book._id} className="col-sm-12 col-md-6 col-lg-3 my-3">
                <div className="card p-3 rounded">
                  <img
                    className="card-img-top mx-auto"
                    src="https://m.media-amazon.com/images/I/617NtexaW2L._AC_UY218_.jpg"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                      <a href="">{book.title}</a>
                    </h5>
                    <div className="ratings mt-auto">
                      <div className="rating-outer">
                        <div className="rating-inner"></div>
                      </div>
                      <span id="no_of_reviews">(5 Reviews)</span>
                    </div>
                    <p className="card-text">$45.67</p>
                    <a href="#" id="view_btn" className="btn btn-block">
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
