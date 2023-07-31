import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MetaData } from "../layout/MetaData";
import { CheckoutSteps } from "./CheckoutSteps";

export const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { cartItems, shippingInfo } = useSelector((state) => state.addToCart);
  const { user } = useSelector((state) => state.loadUser);

  let itemPrice = 0;
  for (const item of cartItems) {
    itemPrice += item.price * item.quantity;
  }
  const shippingPrice = itemPrice > 1000 ? 0 : 10;
  const taxPrice = Number(0.13 * itemPrice.toFixed(2));
  const totalPrice = itemPrice + shippingPrice + taxPrice;

  const proceedToPayment = () => {
    const data = {
      itemPrice: itemPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/");
  };

  return (
    <>
      <div className="container container-fluid">
        <MetaData title={"Confirm Order"} />
        <CheckoutSteps shipping confirmOrder />
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-5 order-confirm">
            <h4 className="mb-3">Shipping Info</h4>
            <p>
              <b>Name:</b> {user?.name}
            </p>
            <p>
              <b>Phone: </b>
              {shippingInfo.phoneNumber}
            </p>
            <p className="mb-4">
              <b>Address:</b> {shippingInfo.address}
            </p>

            <hr />
            <h4 className="mt-4">Your Cart Items:</h4>

            {cartItems.map((item) => (
              <>
                <hr />
                <div className="cart-item my-1" key={item.book_id}>
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <img
                        src="https://images.penguinrandomhouse.com/cover/9780147512543"
                        alt="Laptop"
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="col-5 col-lg-6">
                      <Link href={`/book/${item.book_id}`}>{item.title}</Link>
                    </div>

                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                      <p>
                        {item.quantity} x ${item.price} =
                        <b>${item.quantity * item.price}</b>
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">${itemPrice}</span>
              </p>
              <p>
                Shipping:{" "}
                <span className="order-summary-values">${shippingPrice}</span>
              </p>
              <p>
                Tax: <span className="order-summary-values">${taxPrice}</span>
              </p>

              <hr />

              <p>
                Total:{" "}
                <span className="order-summary-values">${totalPrice}</span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={proceedToPayment}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
