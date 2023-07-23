import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../layout/Loader";
import { MetaData } from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../features/auth/loginSlice";

export const Login = () => {
  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg">
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value=""
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value=""
              />
            </div>

            <a href="#" className="float-right mb-4">
              Forgot Password?
            </a>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

            <a href="#" className="float-right mt-3">
              New User?
            </a>
          </form>
        </div>
      </div>
    </>
  );
};
