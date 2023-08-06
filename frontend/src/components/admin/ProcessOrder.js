import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { MetaData } from "../layout/MetaData";
import { toast } from "react-toastify";
import { orderDetails } from "../../features/order/orderDetailSlice";
import { updateOrder } from "../../features/order/orderSlice";
import { Loader } from "../layout/Loader";
import { Sidebar } from "./Sidebar";

export const ProcessOrder = () => {
  const RESET_UPDATE_ORDER = "RESET_UPDATE_ORDER";
  const CLEAR_ERRORS = "CLEAR_ERRORS";
  const [status, setStatus] = useState("");
  const orderId = useParams().id;
  const dispatch = useDispatch();

  const { error, order, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.updateOrder
  );

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
      dispatch({ type: CLEAR_ERRORS });
    }

    if (updateError) {
      toast(`${error.message}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch({ type: CLEAR_ERRORS });
    }

    if (isUpdated) {
      toast(`Order Updated successfully.`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch({ type: RESET_UPDATE_ORDER });
      // dispatch(fetchBook(bookId));
    }

    if (!loading && order && order.length > 0) {
      setStatus(order[0].orderStatus);
    }
  }, [dispatch, error, isUpdated, orderId, updateError]);

  if (!order || order.length === 0) {
    return <Loader />;
  }

  const { paymentInfo, user, books, totalPrice, shippingAddress, orderStatus } =
    order[0];

  const updateOrderHandler = (id) => {
    const orderData = {
      status,
    };
    dispatch(updateOrder({ id: orderId, orderData }));
  };
  return (
    <>
      <MetaData title={`Process Orders #${order[0]._id}`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 mt-5">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-7 order-details">
                  <h1 className="my-5">Order # {order[0]._id}</h1>

                  <h4 className="mb-4">Shipping Info</h4>
                  <p>
                    <b>Name:</b> {user.name}
                  </p>
                  <p>
                    <b>Phone:</b> {shippingAddress[0].phoneNumber}
                  </p>
                  <p className="mb-4">
                    <b>Address:</b>
                    {shippingAddress[0].address}
                  </p>
                  <p>
                    <b>Amount:</b> ${totalPrice}
                  </p>

                  <hr />

                  <h4 className="my-4">Payment</h4>
                  <p className="greenColor">
                    <b>PAID</b>
                  </p>

                  <h4 className="my-4">Payment ID</h4>
                  <p className="greenColor">
                    <b>stripe_3458349584985</b>
                  </p>

                  <h4 className="my-4">Order Status:</h4>
                  <div className="greenColor">
                    <b>{paymentInfo.id}</b>
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
                              src="/images/book.jpg"
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

                <div className="col-12 col-lg-3 mt-5">
                  <h4 className="my-4">Status</h4>

                  <div className="form-group">
                    <select
                      className="form-control"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-primary btn-block"
                    type="button"
                    onClick={() => updateOrderHandler(order._id)}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
