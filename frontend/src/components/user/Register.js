import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MetaData } from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../../features/auth/registerSlice";
import { toast } from "react-toastify";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { loading, user, isAuthenticated, error } = useSelector(
    (state) => state.register
  );
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (!loading && error) {
      const errorMessagesArray = error.message
        .split(",")
        .map((message) => message.trim());

      errorMessagesArray.forEach((errorMsg) => {
        toast(errorMsg, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
    }
  }, [dispatch, isAuthenticated, error, loading]);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const registerSubmitHandler = (e) => {
    e.preventDefault();
    const formData = {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    };
    dispatch(register(formData));
  };
  return (
    <>
      <MetaData title="Register"></MetaData>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={registerSubmitHandler}>
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                name="name"
                type="name"
                id="name_field"
                className="form-control"
                value={newUser.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                name="email"
                type="email"
                id="email_field"
                className="form-control"
                value={newUser.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                name="password"
                type="password"
                id="password_field"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
