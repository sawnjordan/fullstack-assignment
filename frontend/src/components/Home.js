import React, { useEffect } from "react";
import { MetaData } from "./layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../features/book/bookSlices";
import { Book } from "./book/Book";

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
              <Book key={book._id} book={book} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
