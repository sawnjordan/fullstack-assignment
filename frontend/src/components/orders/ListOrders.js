import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MetaData } from "../layout/MetaData";
import { toast } from "react-toastify";
import { myOrders } from "../../features/order/myOrderSlice";
import { Loader } from "../layout/Loader";
import { MDBDataTable } from "mdbreact";

export const ListOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());
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
          sort: "asc",
        },
      ],
      rows: [],
    };

    orders.forEach((item) => {
      data.rows.push({
        id: item._id,
        numOfItems: item.books.length,
        amount: `${item.totalPrice}`,
        status:
          item?.orderStatus &&
          String(item.orderStatus).includes("Processing") ? (
            <p style={{ color: "red" }}>{item.orderStatus}</p>
          ) : (
            <p style={{ color: "green" }}>{item.orderStatus}</p>
          ),
        actions: (
          <Link to={`/order/${item._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });
    return data;
  };

  return (
    <>
      <div className="container container-fluid">
        <MetaData title={"My Orders"} />
        <h1 className="my-5">My Orders</h1>
        {loading ? (
          <Loader />
        ) : (
          <MDBDataTable
            data={setOrders()}
            className="px-3"
            bordered
            striped
            hover
          />
        )}
      </div>
    </>
  );
};
