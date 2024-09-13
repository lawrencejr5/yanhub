import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCheckCircle, FaCheckCircle } from "react-icons/fa";

import { useGlobalContext } from "../Context";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
import UserModal from "../components/modals/UserModal";
import SearchBox from "../components/SearchBox";
import Loading from "../components/Loading";

import { tasks } from "../data/tasks";
import { users } from "../data/users";

const Tasks = () => {
  const {
    setUserModal,
    userForUserModal,
    setUserForUserModal,
    fetchTasks,
    fetchUsers,
    loading,
    allUsers,
    allTasks,
  } = useGlobalContext();

  useEffect(() => {
    document.title = "Yanhub - Tasks";
    fetchUsers();
    fetchTasks();
  }, []);

  const navigate = useNavigate();

  const clickFunc = (user) => {
    setUserModal(true);
    setUserForUserModal(user);
  };
  const currUser = allUsers.find((user) => {
    if (userForUserModal) return user.username === userForUserModal;
    else return;
  });

  if (loading) return <Loading />;
  return (
    <main className="grid-body tasks-main">
      <Nav />
      <section className="body">
        <Greet />
        <div className="createTaskBtn"></div>
        <div className="header">
          <h2>Tasks</h2>
          <div className="sort-nav">
            <button className="active" onClick={() => navigate("/tasks")}>
              All
            </button>
            <button className="" onClick={() => navigate("/tasks/personal")}>
              Personal
            </button>
          </div>
        </div>
        <SearchBox what={"tasks"} />
        <div className="tasks-container">
          {allTasks.map((task, index) => {
            const { ep, show, status, createdAt, duration, assignedTo, type } =
              task;
            return (
              <div className="task-box" key={index}>
                <div className="header">
                  <small>{createdAt}</small>
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
                <div className="bottom">
                  <div className="users">
                    {assignedTo.map((usr, i) => {
                      const getUser = allUsers.find((user) => usr === user._id);
                      return (
                        <img
                          src={`/imgs/user-icons/${getUser.pic}`}
                          alt=""
                          key={i}
                          onClick={() => clickFunc(getUser.username)}
                        />
                      );
                    })}
                  </div>
                  <button className="text-success">
                    <FaRegCheckCircle />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* <UserModal currUser={currUser} /> */}
      <LeaderboardNav />
      <Bell />
    </main>
  );
};

export default Tasks;
