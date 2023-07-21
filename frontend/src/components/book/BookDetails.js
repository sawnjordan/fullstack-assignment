import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchBook } from "../../features/book/bookSlices";
import { useParams } from "react-router-dom";
import { Loader } from "../layout/Loader";
import { MetaData } from "../layout/MetaData";

export const BookDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, book, error } = useSelector((state) => state.book);
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
    dispatch(fetchBook(id));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={book.title} />
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <img
                src="https://theurbanwriters.com/cdn/shop/files/Overthinking_kindle_1.jpg?v=1644324348"
                alt="sdf"
                height="500"
                width="500"
              />
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{book?.title}</h3>
              <p id="product_id">ISBN: {book?.isbn}</p>

              <p id="product_price">${book.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus">-</span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value="1"
                  readOnly
                />

                <span className="btn btn-primary plus">+</span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status:{" "}
                <span
                  id="stock_status"
                  className={book.stock > 0 ? "greenColor" : "redColor"}
                >
                  {book.stock > 0 ? `In Stock (${book.stock})` : "Out of Stock"}
                </span>
              </p>

              <hr />
              <p id="product_seller mb-3">
                {/* {console.log(book)} */}
                Author/s:{" "}
                <strong>{book.author ? book.author.join(", ") : ""}</strong>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};
