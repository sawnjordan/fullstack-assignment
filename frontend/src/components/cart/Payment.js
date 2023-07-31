import React, { useState } from "react";
import { MetaData } from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CheckoutSteps } from "./CheckoutSteps";

export const Payment = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const { user } = useSelector((state) => state.loadUser);
  const { cartItems, shippingInfo } = useSelector((state) => state.addToCart);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const submitHandler = (e) => {
    e.preventDefault();
    if (!isChecked) {
      toast(`Please select the payment method.`, {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      navigate("/success");
    }
  };
  return (
    <>
      <MetaData title={"Payment"} />
      <CheckoutSteps shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Payment</h1>
            {/* <div className="form-group">
              <input
                type="checkbox"
                checked={isChecked}
                className="form-control"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="card_num_field">Cash on Delivery</label>
            </div> */}
            <div class="form-check">
              <input
                className="form-check-input styled-checkbox .styled-checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="cash_on_delivery">Cash on Delivery</label>
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay/Process
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
