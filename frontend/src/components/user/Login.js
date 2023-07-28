import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../layout/Loader";
import { MetaData } from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../features/auth/loginSlice";
import { toast } from "react-toastify";
import { UPDATE_USER_STATE } from "../../features/auth/userActionTypes";
import { store } from "../../store";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.login
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (!loading && error) {
      toast(`${error.message}`, {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [dispatch, isAuthenticated, error, loading]);

  useEffect(() => {
    if (isAuthenticated) {
      const loginState = store.getState().login;
      dispatch({
        type: UPDATE_USER_STATE,
        payload: loginState,
      });
    }
  }, [dispatch, isAuthenticated]);

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Login"></MetaData>
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={loginSubmitHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <Link
                  to="/forgot-password"
                  href="#"
                  className="float-right mb-4"
                >
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </button>

                <Link to="/register" href="#" className="float-right mt-3">
                  New User?
                </Link>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
