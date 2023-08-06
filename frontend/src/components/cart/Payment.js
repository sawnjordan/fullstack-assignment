import React, { useState } from "react";
import { MetaData } from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../../features/book/cartSlice";

import { useDispatch, useSelector } from "react-redux";
import { CheckoutSteps } from "./CheckoutSteps";
import { newOrder } from "../../features/order/newOrderSlice";

export const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, shippingInfo } = useSelector((state) => state.addToCart);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const [selectedPayment, setSelectedPayment] = useState("cashOnDelivery");
  const submitHandler = (e) => {
    e.preventDefault();
    let books = [];
    cartItems.map((item) => {
      let book = {
        book: item.book_id,
        quantity: item.quantity,
        price: item.price,
        title: item.title,
      };
      books.push(book);
    });
    const order = {
      books,
      totalPrice: orderInfo.totalPrice,
      paymentInfo: { id: selectedPayment },
      shippingAddress: shippingInfo,
    };

    dispatch(newOrder(order));
    dispatch(resetCart());
    navigate("/order/success");
  };
  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };
  return (
    <>
      <MetaData title={"Payment"} />
      <CheckoutSteps shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Payment</h1>

            <label htmlFor="paymentMethod">Payment Method: </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={selectedPayment}
              onChange={handlePaymentChange}
            >
              <option value="cashOnDelivery" disabled>
                Cash on Delivery
              </option>
            </select>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay/Process
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
