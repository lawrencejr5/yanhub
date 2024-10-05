import React from "react";
import { Navigate } from "react-router-dom";
import { useJwt } from "react-jwt";

const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const { isExpired } = useJwt(token);

  if (!token || !user || isExpired) return <Navigate to="/login" />;

  return children;
};

export default Protected;
