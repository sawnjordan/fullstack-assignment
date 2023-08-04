import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MetaData } from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";

import { adminUpdateUser } from "../../features/user/updateSlice";
import { userDetails } from "../../features/user/userDetailsSlice";
import { toast } from "react-toastify";
import { Sidebar } from "./Sidebar";

export const UpdateUser = () => {
  const UPDATE_PROFILE_RESET = "UPDATE_PROFILE_RESET";
  const CLEAR_ERRORS = "CLEAR_ERRORS";
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const userId = useParams().id;
  const { user } = useSelector((state) => state.userDetails);
  const { isUpdated, error } = useSelector((state) => state.updateUser);

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(userDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      toast(error.message, {
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
      toast("User Updated Successfully.", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/admin/users");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
      dispatch(userDetails(userId));
    }
  }, [user, error, dispatch, isUpdated]);

  const updateSubmitHandler = (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      role,
    };
    console.log(userId);
    dispatch(adminUpdateUser({ userId, userData: formData }));
  };

  return (
    <>
      <MetaData title={"Update User"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 mt-5">
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={updateSubmitHandler}>
                <h1 className="mt-2 mb-5">Update User</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
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

                <div className="form-group">
                  <label htmlFor="role_field">Role</label>

                  <select
                    id="role_field"
                    className="form-control"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn update-btn btn-block mt-4 mb-3"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
