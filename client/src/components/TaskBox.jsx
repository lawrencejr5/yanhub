import React from "react";

const TaskBox = ({ task }) => {
  const { show, ep, type, status, duration, date } = task;
  return (
    <div className="task-box">
      <div className="header">
        <small>{date || "16th July, 2024"}</small>
        <small
          id="status"
          className={
            status === "completed"
              ? "success"
              : status === "ongoing"
              ? "warning"
              : "danger"
          }
        >
          {status || "completed"}
        </small>
      </div>
      <strong>{`${show || "Gbam"}(${ep || "Celebrity Barrister"})`}</strong>
      <div className="info">
        <span>{duration || "1hr 25mins"}</span> .{" "}
        <span>{type || "Scaling"}</span>
      </div>
    </div>
  );
};

export default TaskBox;
