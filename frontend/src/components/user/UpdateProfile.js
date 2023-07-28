import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MetaData } from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../../features/user/updateSlice";
import { toast } from "react-toastify";
import { store } from "../../store";
import { UPDATE_USER_STATE } from "../../features/auth/userActionTypes";

export const UpdateProfile = () => {
  const UPDATE_PROFILE_RESET = "UPDATE_PROFILE_RESET";
  const CLEAR_ERRORS = "CLEAR_ERRORS";
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loadUser);
  const { isUpdated, error, loading } = useSelector(
    (state) => state.updateUser
  );

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    if (!loading && error) {
      const errorMessagesArray = error.message
        .split(",")
        .map((message) => message.trim());

      errorMessagesArray.forEach((errorMsg) => {
        toast(errorMsg, {
          position: "top-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
      dispatch({
        type: CLEAR_ERRORS,
      });
    }

    if (isUpdated) {
      toast("User Updated Successfully.", {
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
  }, [user, error, loading, dispatch, isUpdated]);

  const updateSubmitHandler = (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
    };

    dispatch(updateUser(formData));
  };

  useEffect(() => {
    const updatedState = store.getState().updateUser;
    dispatch({
      type: UPDATE_USER_STATE,
      payload: updatedState,
    });
  }, [isUpdated, dispatch]);

  return (
    <>
      <MetaData title={"Update Profile"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={updateSubmitHandler}>
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
