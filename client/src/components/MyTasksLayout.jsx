import React from "react";
import { Link } from "react-router-dom";

import { tasks } from "../data/tasks";

import { useGlobalContext } from "../Context";

const MyTasksLayout = () => {
  const { allTasks } = useGlobalContext();
  const userId = localStorage.getItem("user");
  const filteredTasks = allTasks.filter((task) =>
    task.assignedTo.includes(userId)
  );
  return (
    <div className="tasks-layout">
      <h2>Your Tasks</h2>
      <br />
      <table>
        <tbody>
          {filteredTasks.map((task, i) => {
            const { show, duration, ep, type, status } = task;
            return (
              <tr key={i}>
                <td>{show}</td>
                <td>{ep}</td>
                <td>{duration}</td>
                <td>{type}</td>
                <td>{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="link-container">
        <Link to={"/tasks/personal"} className="link">
          View all my tasks...
        </Link>
      </div>
    </div>
  );
};

export default MyTasksLayout;
