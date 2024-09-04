import React, { useEffect } from "react";
import {
  FaPhone,
  FaBirthdayCake,
  FaThumbsUp,
  FaMoon,
  FaSun,
  FaEdit,
} from "react-icons/fa";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
import EditDetailsModal from "../components/modals/EditDetailsModal";
import EditPasswordModal from "../components/modals/EditPasswordModal";
import ChangeAvatarModal from "../components/modals/ChangeAvatarModal";
import Notification from "../components/Notification";
import TaskBox from "../components/TaskBox";

import { users } from "../data/users";
import { tasks } from "../data/tasks";

import { useGlobalContext } from "../Context";

const Account = () => {
  const {
    setEditModal,
    setEditPassModal,
    setAvatarModal,
    loggedIn,
    theme,
    setTheme,
    notification,
    setNotification,
    signedIn,
  } = useGlobalContext();

  useEffect(() => {
    document.title = "Yanhub - My Account";
  }, []);

  // Dark/Light mode toggle function
  const toggleTheme = () => {
    setTheme((prev) => {
      return prev === "light" ? "dark" : "light";
    });
    if (theme === "light") {
      setNotification({
        text: "Theme set to dark mode",
        status: "true",
        theme: "success",
      });
    }
    if (theme === "dark") {
      setNotification({
        text: "Theme set to light mode",
        status: "true",
        theme: "success",
      });
    }
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
          <img src={`/imgs/user-icons/hacker.png`} alt="" />
        </div>
        <div className="name-sec">
          <h3>{signedIn.fullname}</h3>
          <small>@{signedIn.username}</small>
          <p>{signedIn.bio}</p>
        </div>
        <div className="details-sec">
          <h3>User details...</h3>
          <div className="details">
            <span>
              <FaBirthdayCake /> Born on -- --
            </span>
            <span>
              <FaThumbsUp /> 0 project(s) completed this month
            </span>
            <span>
              <FaPhone /> {signedIn.phone || "--------"}
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
            <span>Set theme</span>
            <button onClick={toggleTheme}>
              {theme === "dark" ? <FaMoon /> : <FaSun />}
            </button>
          </div>
          <div className="set-item">
            <span>Change password</span>
            <button onClick={() => setEditPassModal(true)}>
              <FaEdit />
            </button>
          </div>
          <div className="set-item">
            <span>Change avatar</span>
            <button onClick={() => setAvatarModal(true)}>
              <FaEdit />
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
        <Notification
          text={notification.text}
          theme={notification.theme}
          status={notification.status}
        />
      </section>
      <LeaderboardNav />
      <Bell />
      <EditDetailsModal />
      <EditPasswordModal />
      <ChangeAvatarModal />
    </main>
  );
};

export default Account;
