import React from "react";
import { Link } from "react-router-dom";

export const Book = ({ book }) => {
  return (
    <>
      <div key={book._id} className="col-sm-12 col-md-6 col-lg-3 my-3">
        <div className="card p-3 rounded">
          <img
            className="card-img-top mx-auto"
            src="https://images.penguinrandomhouse.com/cover/9780147512543"
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">
              <Link to={`/books/${book._id}`}>{book.title}</Link>
            </h5>
            <div className="mt-auto">
              <div className="">
                <strong>Author/s:</strong> {book.author.join(", ")}
              </div>
            </div>
            <p className="card-text">${book.price}</p>
            <Link
              to={`/books/${book._id}`}
              id="view_btn"
              className="btn btn-block"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
