import React from "react";
import { Link, useLocation } from "react-router-dom";
const TaskNav = ({ currVid }) => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[2];
  return (
    <nav className="task-nav">
      <Link
        className={`link ${path === "tasks" ? "active" : ""}`}
        to={`/video/tasks/${currVid._id}`}
      >
        Tasks
      </Link>{" "}
      &nbsp;
      <Link
        className={`link ${path === "assign" ? "active" : ""}`}
        to={`/video/assign/${currVid._id}`}
      >
        Assign Tasks
      </Link>
    </nav>
  );
};

export default TaskNav;
