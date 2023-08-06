import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MetaData } from "../layout/MetaData";
import { toast } from "react-toastify";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../features/book/cartSlice";

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.addToCart);
  const removeCartItemHandler = (id) => {
    dispatch(removeItemsFromCart(id));
    toast(`Book Removed.`, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    const cartData = {
      id,
      quantity: newQty,
    };

    dispatch(addItemsToCart(cartData));
  };
  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    const cartData = {
      id,
      quantity: newQty,
    };

    dispatch(addItemsToCart(cartData));
  };

  const calculateTotalQuantity = () => {
    let totalQuantity = 0;
    for (const item of cartItems) {
      totalQuantity += item.quantity;
    }
    return totalQuantity;
  };
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of cartItems) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice.toFixed(2);
  };
  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  return (
    <>
      <div className="container container-fluid">
        <MetaData title={"Your Cart"} />
        {cartItems.length === 0 ? (
          <h2 className="mt-5">Your Cart is empty.</h2>
        ) : (
          <>
            {" "}
            <h2 className="mt-5">
              Your Cart: <b>{cartItems.length} items</b>
            </h2>
            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8">
                {cartItems.map((item) => (
                  <div key={item.book_id} className="cart-item">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src="/images/book.jpg"
                          alt="Book"
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/books/${item.book_id}`}>{item.title}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() =>
                              decreaseQty(item.book_id, item.quantity)
                            }
                          >
                            -
                          </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />

                          <span
                            className="btn btn-primary plus"
                            onClick={() =>
                              increaseQty(
                                item.book_id,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => removeCartItemHandler(item.book_id)}
                        ></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                  <h4>Order Summary</h4>
                  <hr />
                  <p>
                    Total Quantity:
                    <span className="order-summary-values">
                      {calculateTotalQuantity()} (Items)
                    </span>
                  </p>
                  <p>
                    Est. Total Price:
                    <span className="order-summary-values">
                      ${calculateTotalPrice()}
                    </span>
                  </p>

                  <hr />
                  <button
                    id="checkout_btn"
                    className="btn btn-primary btn-block"
                    onClick={checkoutHandler}
                  >
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
