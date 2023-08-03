import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MetaData } from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../layout/Loader";
import { fetchAdminBooks } from "../../features/book/booksSlices";
import { allOrders } from "../../features/order/allOrdersSlice";
import { Sidebar } from "./Sidebar";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  const { orders, totalAmount, loading } = useSelector(
    (state) => state.allOrders
  );
  useEffect(() => {
    dispatch(fetchAdminBooks());
    dispatch(allOrders());
  }, [dispatch]);

  let outOfStock = 0;
  books.forEach((book) => {
    if (book.stock === 0) {
      outOfStock++;
    }
  });
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">Dashboard</h1>
          {loading ? (
            <Loader />
          ) : (
            <>
              <MetaData title={"Admin Dashboard"} />
              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Total Amount
                        <br /> <b>${totalAmount}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pr-4">
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-success o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Books
                        <br /> <b>{books && books.length}</b>
                      </div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/books"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-danger o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Orders
                        <br /> <b>{orders.length}</b>
                      </div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/orders"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-info o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Users
                        <br /> <b>45</b>
                      </div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      href="/admin/users"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-warning o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Out of Stock
                        <br /> <b>{outOfStock}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
