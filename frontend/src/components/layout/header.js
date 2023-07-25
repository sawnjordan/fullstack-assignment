import { Link } from "react-router-dom";
import "../../App.css";
import React from "react";
import { Search } from "./Search";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";

export const Header = () => {
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.loadUser);

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
              className="btn btn-block text-white"
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
                <Dropdown.Item as={Link} to="/dashboard" className="text-black">
                  Dashboard
                </Dropdown.Item>
              )}
              <Dropdown.Item as={Link} to="/" className="text-danger">
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
            2
          </span>
        </Link>
      </div>
    </nav>
  );
};
