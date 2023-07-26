import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = (props) => {
  const { Component } = props;
  const { isAuthenticated, loading } = useSelector((state) => state.loadUser);

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to the login page.
    return <Navigate to="/login" />;
  } else {
    return <Component />;
  }
};
