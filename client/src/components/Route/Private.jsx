import React from "react";
import { Navigate } from "react-router-dom";

import Notfound from "../../pages/Notfound";

import { useGlobalContext } from "../../Context";
const Private = ({ children }) => {
  const { isAdmin } = useGlobalContext();

  const token = localStorage.getItem("token");

  if (!isAdmin) return <Notfound />;
  if (!token) return <Navigate to="login" />;

  return children;
};

export default Private;
