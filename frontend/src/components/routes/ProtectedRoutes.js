import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Loader } from "../layout/Loader";

export const ProtectedRoute = (props) => {
  const { Component } = props;
  const { isAdmin = false } = props;
  const { user, isAuthenticated, loading } = useSelector(
    (state) => state.loadUser
  );
  // console.log(isAuthenticated, loading);
  if (loading) {
    return <Loader />; // Replace Loader with your loading indicator component
  }

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to the login page.
    return <Navigate to="/login" />;
  } else if (user?.role !== "admin") {
    return <Navigate to="/" />;
  } else {
    return <Component />;
  }
};
