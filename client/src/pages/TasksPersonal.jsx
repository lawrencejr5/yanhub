import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronCircleUp } from "react-icons/fa";

import { useGlobalContext } from "../Context";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
import CreateTaskForm from "../components/CreateTaskForm";
import TaskBox from "../components/TaskBox";

import { tasks } from "../data/tasks";

const TasksPersonal = () => {
  const { loggedIn } = useGlobalContext();

  useEffect(() => {
    document.title = "Yanhub - Tasks";
  }, []);
  const navigate = useNavigate();

  // Get personal tasks
  const userTasks = tasks.filter((task) => task.users.includes(loggedIn));

  return (
    <main className="grid-body tasks-main">
      <Nav />
      <section className="body">
        <Greet />
        {/* <div className="createTaskBtn">
          <button onClick={() => setOpenCreateTaskModal(true)}>
            Todo List &nbsp;
            <FaChevronCircleUp />
          </button>
        </div> */}
        <div className="header">
          <h2>Tasks</h2>
          <div className="sort-nav">
            <button className="" onClick={() => navigate("/tasks")}>
              All
            </button>
            <button
              className="active"
              onClick={() => navigate("/tasks/personal")}
            >
              Personal
            </button>
          </div>
        </div>
        <div className="tasks-container">
          {userTasks.map((task, index) => {
            return <TaskBox task={task} key={index} />;
          })}
        </div>
      </section>
      <LeaderboardNav />
      <Bell />
      {/* <CreateTaskForm open={openCreateTaskModal} /> */}
    </main>
  );
};

export default TasksPersonal;
