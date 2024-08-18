import React, { useEffect, useState } from "react";
import {
  FaPhone,
  FaBirthdayCake,
  FaThumbsUp,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
import EditDetailsModal from "../components/EditDetailsModal";
import TaskBox from "../components/TaskBox";

import { users } from "../data/users";
import { tasks } from "../data/tasks";

import { useGlobalContext } from "../Context";

const Account = () => {
  const { setEditModal, loggedIn, theme, setTheme } = useGlobalContext();

  useEffect(() => {
    document.title = "Yanhub - My Account";
  }, []);

  // Dark/Light mode toggle function
  const toggleTheme = () => {
    setTheme((prev) => {
      return prev === "light" ? "dark" : "light";
    });
  };

  // Get personal tasks
  const user = users.find((usr) => usr.username === loggedIn);
  const { pic, username, fullname } = user;
  const userTasks = tasks.filter((task) => task.users.includes(loggedIn));

  return (
    <main className="grid-body account-main">
      <Nav />
      <section className="body">
        <Greet />
        <div className="banner">
          <img src={`/imgs/user/${pic}`} alt="" />
        </div>
        <div className="name-sec">
          <h3>{fullname}</h3>
          <small>@{username}</small>
          <p>{"I am the developer of yanhub"}</p>
        </div>
        <div className="details-sec">
          <h3>User details...</h3>
          <div className="details">
            <span>
              <FaBirthdayCake /> Born on -- --
            </span>
            <span>
              <FaThumbsUp /> 3 project(s) completed this month
            </span>
            <span>
              <FaPhone /> 09025816161
            </span>
            <div className="btn-holder">
              <button onClick={() => setEditModal(true)}>
                Edit details...
              </button>
            </div>
          </div>
        </div>
        <div className="set-sec">
          <h3>Settings...</h3>
          <div className="set-item">
            <span>Set light/dark mode</span>
            <button onClick={toggleTheme}>
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
        <div className="tasks-sec">
          <h3>Your tasks...</h3>
          {userTasks.map((task, index) => {
            return <TaskBox task={task} key={index} />;
          })}
        </div>
        <br />
      </section>
      <LeaderboardNav />
      <Bell />
      <EditDetailsModal />
    </main>
  );
};

export default Account;
