import React, { useState } from "react";
import { MetaData } from "../layout/MetaData";

export const OrderSuccess = () => {
  return (
    <>
      <MetaData title={"Order Success"} />
      <div className="container container-fluid">
        <div className="row justify-content-center">
          <div className="col-6 mt-5 text-center">
            <img
              className="my-5 img-fluid d-block mx-auto"
              src="https://freepngimg.com/thumb/success/6-2-success-png-image.png"
              alt="Order Success"
              width="200"
              height="200"
            />

            <h2>Your Order has been placed successfully.</h2>

            <a href="/order">Go to Orders</a>
          </div>
        </div>
      </div>
    </>
  );
};
