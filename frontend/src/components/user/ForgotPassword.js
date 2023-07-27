import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MetaData } from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";

import { forgotPassword } from "../../features/user/forgotPasswordSlice";
import { toast } from "react-toastify";
import { store } from "../../store";
import { UPDATE_USER_STATE } from "../../features/auth/userActionTypes";

export const ForgotPassword = () => {
  const CLEAR_ERRORS = "CLEAR_ERRORS";
  const CLEAR_MESSAGE = "CLEAR_MESSAGE";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.loadUser);

  if (isAuthenticated) {
    navigate("/");
  }

  useEffect(() => {
    if (!loading && error) {
      toast(`${error.message}`, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch({
        type: CLEAR_ERRORS,
      });
    }

    if (message) {
      toast(`${message}`, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch({
        type: CLEAR_MESSAGE,
      });
    }
  }, [error, dispatch, message, loading]);

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={resetPasswordHandler}>
            <h1 className="mb-3">Forgot Password</h1>
            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
