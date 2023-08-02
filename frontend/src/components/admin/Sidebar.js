import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <>
      <div className="sidebar-wrapper">
        <nav id="sidebar">
          <ul className="list-unstyled components">
            <li>
              <Link to="/dashboard">
                <i className="fa fa-tachometer"></i> Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="#productSubmenu"
                data-bs-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                <i className="fa fa-product-hunt"></i> Books
              </Link>
              <ul className="collapse list-unstyled" id="productSubmenu">
                <li>
                  <Link to="/admin/books">
                    <i className="fa fa-clipboard-list"></i> All
                  </Link>
                </li>

                <li>
                  <Link to="/admin/book/new">
                    <i className="fa fa-plus"></i> Create
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/admin/orders">
                <i className="fa fa-shopping-basket"></i> Orders
              </Link>
            </li>

            <li>
              <Link to="/admin/users">
                <i className="fa fa-users"></i> Users
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
