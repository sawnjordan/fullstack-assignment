import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MetaData } from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";

import { updateUserPassword } from "../../features/user/updateSlice";
import { toast } from "react-toastify";
import { store } from "../../store";
import { UPDATE_USER_STATE } from "../../features/auth/userActionTypes";

export const UpdatePassword = () => {
  const UPDATE_PROFILE_RESET = "UPDATE_PROFILE_RESET";
  const CLEAR_ERRORS = "CLEAR_ERRORS";
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loadUser);

  const { isUpdated, error, loading } = useSelector(
    (state) => state.updateUser
  );

  useEffect(() => {
    if (!loading && error) {
      toast(`${error.message}`, {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch({
        type: CLEAR_ERRORS,
      });
    }

    if (isUpdated) {
      toast("Password Updated Successfully.", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/me");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [error, loading, dispatch, isUpdated, user]);

  const updateSubmitHandler = (e) => {
    e.preventDefault();

    const formData = {
      oldPassword,
      password,
    };

    dispatch(updateUserPassword(formData));
  };

  useEffect(() => {
    const updatedState = store.getState().updateUser;
    // console.log(updatedState);
    dispatch({
      type: UPDATE_USER_STATE,
      payload: updatedState,
    });
  }, [isUpdated, dispatch, user]);

  return (
    <>
      <MetaData title={"Update Password"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={updateSubmitHandler}>
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="form-group">
              <label htmlFor="old_password_field">Old Password</label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
