import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
const Back = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div className="back-nav-container relative">
      <div className="back-nav sticky">
        <FaChevronLeft className="back-icon" onClick={() => navigate(-1)} />
        <h3>{text}</h3>
        <div></div>
      </div>
    </div>
  );
};

export default Back;
