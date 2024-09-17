import React from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../Context";

const MyTasksLayout = () => {
  const { allTasks } = useGlobalContext();
  const userId = localStorage.getItem("user");
  const filteredTasks = allTasks.filter((task) =>
    task.assignedTo.some((usr) => usr._id === userId)
  );
  return (
    <div className="tasks-layout">
      <h2>Your Tasks</h2>
      <br />
      {filteredTasks.length === 0 ? (
        <p>Them never assign any task give you yet</p>
      ) : (
        <table>
          <tbody>
            {filteredTasks.map((task, i) => {
              const {
                video: {
                  duration,
                  ep,
                  show: { show },
                },
                type,
                status,
              } = task;
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
      )}
      <div className="link-container">
        {filteredTasks.length === 0 ? (
          <Link to={"/tasks"} className="link">
            View all tasks...
          </Link>
        ) : (
          <Link to={"/tasks/personal"} className="link">
            View all my tasks...
          </Link>
        )}
      </div>
    </div>
  );
};

export default MyTasksLayout;
