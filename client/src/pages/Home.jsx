import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("dashboard");
  }, []);
  return <div>Redirecting...</div>;
};

export default Home;
