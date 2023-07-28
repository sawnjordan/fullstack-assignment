import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchBook } from "../../features/book/bookSlices";
import { useParams } from "react-router-dom";
import { Loader } from "../layout/Loader";
import { MetaData } from "../layout/MetaData";
import { addItemsToCart } from "../../features/book/cartSlice";

export const BookDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { loading, book, error } = useSelector((state) => state.book);
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
    dispatch(fetchBook(id));
  }, [dispatch]);

  const increaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber >= book.stock) return;

    const stock = count.valueAsNumber + 1;
    setQuantity(stock);
  };
  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;

    const stock = count.valueAsNumber - 1;
    setQuantity(stock);
  };

  const addToCart = () => {
    dispatch(addItemsToCart({ id, quantity }));
    toast(`Book Added To Cart.`, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

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
                <span className="btn btn-danger minus" onClick={decreaseQty}>
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />

                <span className="btn btn-primary plus" onClick={increaseQty}>
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                disabled={book.stock === 0 ? true : false}
                onClick={addToCart}
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
