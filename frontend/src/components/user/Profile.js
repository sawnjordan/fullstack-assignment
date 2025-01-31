import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MetaData } from "../layout/MetaData";
import { Loader } from "../layout/Loader";

export const Profile = () => {
  const { user, loading } = useSelector((state) => state.loadUser);
  const dateObject = new Date(user.createdAt);

  const month = dateObject.toLocaleString("default", { month: "long" });
  const date = dateObject.getDate();
  const year = dateObject.getFullYear();
  const formattedDate = `${month} ${date}, ${year}`;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Your Profile"}></MetaData>
          <h2 className="mt-5 ml-5">My Profile({user.role})</h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile">
                <img
                  className="rounded-circle img-fluid"
                  src="/images/avatar.jpg"
                  alt=""
                />
              </figure>
              <Link
                to="/me/update"
                id="edit_profile"
                className="btn btn-primary btn-block my-5"
              >
                Edit Profile
              </Link>
            </div>

            <div className="col-12 col-md-5">
              <h4>Full Name</h4>
              <p>{user.name}</p>

              <h4>Email Address</h4>
              <p>{user.email}</p>

              <h4>Created At:</h4>
              <p>{formattedDate}</p>
              {user.role !== "admin" && (
                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                  My Orders
                </Link>
              )}

              <Link
                to="/password/update"
                className="btn btn-primary btn-block mt-3"
              >
                Change Password
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};
