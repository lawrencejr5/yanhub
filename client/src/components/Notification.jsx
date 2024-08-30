import React from "react";
import { FaThumbsUp, FaTimesCircle } from "react-icons/fa";

const Notification = ({ text, theme, status }) => {
  return (
    <div className="notification-container">
      <div className={`notification text-${theme} ${status ? "down" : "up"}`}>
        {theme === "success" ? <FaThumbsUp /> : <FaTimesCircle />}
        &nbsp;<span>{text}</span>
      </div>
    </div>
  );
};

export default Notification;