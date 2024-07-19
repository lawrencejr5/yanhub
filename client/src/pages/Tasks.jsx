import React, { useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";

import { useGlobalContext } from "../Context";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
import CreateTaskForm from "../components/CreateTaskForm";
const Tasks = () => {
  useEffect(() => {
    document.title = "Yanhub - Tasks";
  }, []);

  const { openCreateTaskModal, setOpenCreateTaskModal } = useGlobalContext();
  return (
    <main className="grid-body tasks-main">
      <Nav />
      <section className="body">
        <Greet />
        <div className="createTaskBtn">
          <button onClick={() => setOpenCreateTaskModal(true)}>
            New Task &nbsp;
            <FaPlusCircle />
          </button>
        </div>
        <div className="header">
          <h2>Tasks</h2>
        </div>
        <div className="tasks-container">
          <div className="task-box"></div>
        </div>
      </section>
      <LeaderboardNav />
      <Bell />
      <CreateTaskForm open={openCreateTaskModal} />
    </main>
  );
};

export default Tasks;
