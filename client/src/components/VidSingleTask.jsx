import React from "react";

import { useGlobalContext } from "../Context";

const VidSingleTask = ({ task }) => {
  const { setAssignModal, assignModal } = useGlobalContext();

  return (
    <div className="vid-single-task">
      <p>{task}</p>
      <button onClick={() => setAssignModal(true)}>Assign</button>
    </div>
  );
};

export default VidSingleTask;
