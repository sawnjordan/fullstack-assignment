import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MetaData } from "../layout/MetaData";
import { toast } from "react-toastify";
import { orderDetails } from "../../features/order/orderDetailSlice";
import { Loader } from "../layout/Loader";

export const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { loading, error, order } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(orderDetails(orderId));
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
  }, [dispatch, error, orderId]);
  if (!order || order.length === 0) {
    return <Loader />;
  }

  const { paymentInfo, user, books, totalPrice, shippingAddress, orderStatus } =
    order[0];
  return (
    <>
      <MetaData title={"Order Details"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container container-fluid">
            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8 mt-5 order-details">
                <h1 className="my-5">Order # {order[0]._id}</h1>

                <h4 className="mb-4">Shipping Info</h4>
                <p>
                  <b>Name:</b> {user?.name}
                </p>
                <p>
                  <b>Phone:</b> {shippingAddress[0]?.phoneNumber}
                </p>
                <p className="mb-4">
                  <b>Address:</b>
                  {shippingAddress[0]?.address}
                </p>
                <p>
                  <b>Amount:</b> ${totalPrice}
                </p>

                <hr />

                <h4 className="my-4">Payment</h4>
                <p className="greenColor">
                  <b>PAID</b>
                </p>

                <h4 className="my-4">Order Status:</h4>
                <div className="greenColor">
                  <b>
                    {orderStatus &&
                    String(orderStatus).includes("Processing") ? (
                      <p style={{ color: "red" }}>{orderStatus}</p>
                    ) : (
                      <p style={{ color: "green" }}>{orderStatus}</p>
                    )}
                  </b>
                </div>

                <h4 className="my-4">Order Items:</h4>

                {books.map((item) => (
                  <div key={item.book}>
                    <hr />
                    <div className="cart-item my-1">
                      <div className="row my-5">
                        <div className="col-4 col-lg-2">
                          <img
                            src="https://images.penguinrandomhouse.com/cover/9780147512543"
                            alt="Laptop"
                            height="45"
                            width="65"
                          />
                        </div>

                        <div className="col-5 col-lg-5">
                          <Link to={`/books/${item.book}`}>{item.title}</Link>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p>${item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <p>{item.quantity} Piece(s)</p>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
