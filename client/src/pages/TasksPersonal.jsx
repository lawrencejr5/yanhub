import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronCircleUp } from "react-icons/fa";

import { useGlobalContext } from "../Context";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
import CreateTaskForm from "../components/CreateTaskForm";

import { tasks } from "../data/tasks";
import { users } from "../data/users";

const TasksPersonal = () => {
  useEffect(() => {
    document.title = "Yanhub - Tasks";
  }, []);
const navigate = useNavigate()
  const { openCreateTaskModal, setOpenCreateTaskModal } = useGlobalContext();
  return (
    <main className="grid-body tasks-main">
      <Nav />
      <section className="body">
        <Greet />
        <div className="createTaskBtn">
          <button onClick={() => setOpenCreateTaskModal(true)}>
            Todo List &nbsp;
            <FaChevronCircleUp />
          </button>
        </div>
        <div className="header">
          <h2>Tasks</h2>
          <div className="sort-nav">
            <button className="" onClick={()=>navigate('/tasks')}>All</button>
            <button className="active" onClick={()=>navigate('/tasks/personal')}>Personal</button>
          </div>
        </div>
        <div className="tasks-container">
          {tasks.map((task, index) => {
            const {
              ep,
              show,
              status,
              date,
              duration,
              users: usrs,
              type,
            } = task;
            return (
              <div className="task-box" key={index}>
                <div className="header">
                  <small>{date}</small>
                  <small
                    id="status"
                    className={
                      status === "completed"
                        ? "success"
                        : status === "ongoing"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {status}
                  </small>
                </div>
                <strong>{`${show}(${ep})`}</strong>
                <div className="info">
                  <span>{duration}</span> . <span>{type}</span>
                </div>
                <div className="users">
                  {usrs.map((usr, i) => {
                    const getUser = users.find((user) => usr === user.username);
                    return (
                      <img src={`/imgs/user/${getUser.pic}`} alt="" key={i} />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <LeaderboardNav />
      <Bell />
      <CreateTaskForm open={openCreateTaskModal} />
    </main>
  );
};

export default TasksPersonal;
