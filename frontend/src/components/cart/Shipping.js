import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MetaData } from "../layout/MetaData";
import { toast } from "react-toastify";
import { CheckoutSteps } from "./CheckoutSteps";
export const Shipping = () => {
  const navigate = useNavigate();
  const SAVE_SHIPPING_INFO = "SAVE_SHIPPING_INFO";
  const { shippingInfo } = useSelector((state) => state.addToCart);
  const dispatch = useDispatch();
  const [address, setAddress] = useState(shippingInfo.address);
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: { address, phoneNumber },
    });
    navigate("/confirm");
  };
  return (
    <>
      <div className="container container-fluid">
        <MetaData title={"Shipping Info"} />
        <CheckoutSteps shipping />
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h1 className="mb-4">Shipping Info</h1>
              <div className="form-group">
                <label htmlFor="address_field">Address</label>
                <input
                  type="text"
                  id="address_field"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone_field">Phone No</label>
                <input
                  type="phone"
                  id="phone_field"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              <button
                id="shipping_btn"
                type="submit"
                className="btn btn-block py-3"
              >
                CONTINUE
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
