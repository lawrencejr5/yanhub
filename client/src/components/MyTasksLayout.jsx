import React from "react";
import { Link } from "react-router-dom";
import { myTasks } from "../data/myTasks";

const MyTasksLayout = () => {
  const filteredTasks = myTasks.filter((task) => task.user === "lawrencejr");
  return (
    <div className="tasks-layout">
      <h2>Your Tasks</h2>
      <br />
      <table>
        <tbody>
          {filteredTasks.map((task, i) => {
            const { task: aTask, duration, xp, type, status } = task;
            return (
              <tr key={i}>
                <td>{aTask}</td>
                <td>{type}</td>
                <td>{duration}</td>
                <td>{xp}xp</td>
                <td>{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="link-container">
        <Link to={"/my-tasks"} className="link">
          Manage all your tasks...
        </Link>
      </div>
    </div>
  );
};

export default MyTasksLayout;
