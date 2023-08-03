import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MetaData } from "../layout/MetaData";
import { toast } from "react-toastify";
import { allOrders } from "../../features/order/allOrdersSlice";
import { Loader } from "../layout/Loader";
import { MDBDataTable } from "mdbreact";
import { Sidebar } from "./Sidebar";

export const OrdersList = () => {
  const CLEAR_ERRORS = "CLEAR_ERRORS";
  //   const RESET_DELETE_BOOK = "RESET_DELETE_BOOK";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, orders } = useSelector((state) => state.allOrders);

  useEffect(() => {
    dispatch(allOrders());
    if (error) {
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
    // if (deleteError) {
    //   toast(`${error.message}`, {
    //     position: "top-right",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //   });
    //   dispatch({ type: CLEAR_ERRORS });
    // }
    // if (isDeleted) {
    //   navigate("/admin/orders");
    //   toast(`${message}`, {
    //     position: "top-right",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //   });
    //   dispatch({ type: RESET_DELETE_BOOK });
    // }
  }, [dispatch, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID:",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.books.length,
        amount: order.totalPrice,
        status:
          order?.orderStatus &&
          String(order.orderStatus).includes("Processing") ? (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ),
        actions: (
          <>
            <Link
              to={`/admin/order/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button className="btn btn-danger py-1 px-2 ml-2" type="button">
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });
    return data;
  };
  return (
    <>
      <MetaData title={"All Orders"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 mt-5">
          {loading ? (
            <Loader />
          ) : (
            <>
              <MDBDataTable
                data={setOrders()}
                className="px-3"
                bordered
                striped
                hover
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
