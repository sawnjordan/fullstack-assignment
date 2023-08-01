import { Link } from "react-router-dom";
import "../../App.css";
import React, { useEffect } from "react";
import { Search } from "./Search";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { logout } from "../../features/auth/logoutSlice";
import { toast } from "react-toastify";
import { UPDATE_USER_STATE } from "../../features/auth/userActionTypes";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated, error } = useSelector(
    (state) => state.logoutUser
  );
  const { cartItems } = useSelector((state) => state.addToCart);

  const logoutHandler = () => {
    dispatch(logout());
    toast(`Logged out Successfully.`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    dispatch({
      type: UPDATE_USER_STATE,
      payload: {
        loading: false,
        isAuthenticated: false,
        error: null,
        user: null,
      },
    });
  };

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <img src="/images/logo-book.jpg" alt="Logo" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search navigate={navigate} />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {user ? (
          <Dropdown className="ml-4 d-inline-block">
            <Dropdown.Toggle
              variant="default"
              id="dropDownMenuButton"
              className="btn btn-block text-white mr-5"
            >
              {user.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/me" className="text-black">
                Profile
              </Dropdown.Item>
              {user && user.role !== "admin" ? (
                <Dropdown.Item as={Link} to="/orders/me" className="text-black">
                  Orders
                </Dropdown.Item>
              ) : (
                <>
                  <Dropdown.Item
                    as={Link}
                    to="/dashboard"
                    className="text-black"
                  >
                    Dashboard
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to="/orders/me"
                    className="text-black"
                  >
                    Orders
                  </Dropdown.Item>
                </>
              )}
              <Dropdown.Item
                as={Link}
                to="/"
                className="text-danger"
                onClick={logoutHandler}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : !loading ? (
          <Link
            to="/login"
            className="btn"
            id="login_btn"
            style={{ textDecoration: "none" }}
          >
            Login
          </Link>
        ) : null}

        <Link to="/cart" className="ml-4">
          <span id="cart">Cart</span>
          <span className="ml-1" id="cart_count">
            {cartItems.length}
          </span>
        </Link>
      </div>
    </nav>
  );
};
