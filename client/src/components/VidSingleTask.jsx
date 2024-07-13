import React from "react";

const VidSingleTask = ({ task }) => {
  return (
    <div className="vid-single-task">
      <p>{task}</p>
      <button>Assign</button>
    </div>
  );
};

export default VidSingleTask;
