import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, useNavigate } from "react-router-dom";

export const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const { Component } = props;
  const { isAuthenticated, loading } = useSelector((state) => state.loadUser);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  });

  return <Component />;
};
