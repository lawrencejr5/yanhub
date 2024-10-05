import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

import { useGlobalContext } from "../Context";
const Back = ({ text }) => {
  const navigate = useNavigate();

  const { loading } = useGlobalContext();
  return (
    <div className="back-nav-container relative">
      <div className="back-nav sticky">
        <FaChevronLeft className="back-icon" onClick={() => navigate(-1)} />
        <h3>{loading ? "---" : text}</h3>
        <div></div>
      </div>
    </div>
  );
};

export default Back;
