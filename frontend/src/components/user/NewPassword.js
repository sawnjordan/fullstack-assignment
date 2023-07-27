import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MetaData } from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";

import { resetPassword } from "../../features/user/forgotPasswordSlice";
import { toast } from "react-toastify";
import { store } from "../../store";
import { UPDATE_USER_STATE } from "../../features/auth/userActionTypes";
import { Loader } from "../layout/Loader";

export const NewPassword = () => {
  const { token } = useParams();

  const UPDATE_PROFILE_RESET = "UPDATE_PROFILE_RESET";
  const CLEAR_ERRORS = "CLEAR_ERRORS";
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConformPassword] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loadUser);

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

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
      toast(`Password Updated Successfully.`, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/login");
    }
  }, [error, dispatch, message, loading]);

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    const credentialsData = {
      password,
      confirmPassword,
    };
    dispatch(resetPassword({ token, credentialsData }));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Password Reset"} />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={resetPasswordHandler}>
                <h1 className="mb-3">New Password</h1>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirm_password_field">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm_password_field"
                    className="form-control"
                    onChange={(e) => {
                      setConformPassword(e.target.value);
                    }}
                  />
                </div>

                <button
                  id="new_password_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  Set Password
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
