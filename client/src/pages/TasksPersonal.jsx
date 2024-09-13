import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../Context";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
import TaskBox from "../components/TaskBox";
import SearchBox from "../components/SearchBox";
import Loading from "../components/Loading";

const TasksPersonal = () => {
  const { allTasks, fetchTasks, loading } = useGlobalContext();

  useEffect(() => {
    document.title = "Yanhub - Tasks";
    fetchTasks();
  }, []);
  const userId = localStorage.getItem("user");
  const filteredTasks = allTasks.filter((task) =>
    task.assignedTo.includes(userId)
  );
  const navigate = useNavigate();

  if (loading) return <Loading />;

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
          <SearchBox what={"personal tasks"} />

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
          {filteredTasks.map((task, index) => {
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
