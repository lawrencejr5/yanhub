import React from "react";

import { useGlobalContext } from "../Context";

const VidSingleTask = ({ task }) => {
  const { setAssignModal, setAssignTask, setChecked } = useGlobalContext();

  const func = () => {
    setAssignTask(task);
    setAssignModal(true);
    setChecked(null);
  };
  return (
    <div className="vid-single-task">
      <p>{task}</p>
      <button onClick={func}>Assign</button>
    </div>
  );
};

export default VidSingleTask;
