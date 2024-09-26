import React, { useEffect } from "react";
import {
  FaPhone,
  FaBirthdayCake,
  FaBars,
  FaMoon,
  FaSun,
  FaEdit,
} from "react-icons/fa";
import { format } from "date-fns";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
import EditDetailsModal from "../components/modals/EditDetailsModal";
import EditPasswordModal from "../components/modals/EditPasswordModal";
import ChangeAvatarModal from "../components/modals/ChangeAvatarModal";
import Notification from "../components/Notification";
import TaskBox from "../components/TaskBox";
import Loading from "../components/Loading";

import { useGlobalContext } from "../Context";
import UserModal from "../components/modals/UserModal";
import TasksOptions from "../components/options/TasksOptions";

const Account = () => {
  const {
    setEditModal,
    setEditPassModal,
    setAvatarModal,
    theme,
    toggleTheme,
    notification,
    signedIn,
    fetchTasks,
    allTasks,
    currUser,
    loading,
    getTasksCompletedPerMonth,
    numOfMonthTasks,
  } = useGlobalContext();

  useEffect(() => {
    document.title = "Yanhub - My Account";
    fetchTasks();
    getTasksCompletedPerMonth(localStorage.getItem("user"));
  }, []);

  // Get personal tasks
  const { pic, username, fullname, bio, phone, dob } = signedIn;
  const filteredTasks = allTasks.filter((task) =>
    task.assignedTo.some((usr) => usr._id === signedIn._id)
  );

  // Formatting date
  let newDob;
  const date = new Date(dob);
  if (!isNaN(date)) {
    newDob = format(date, "MMMM do");
  }

  if (loading) return <Loading />;
  return (
    <main className="grid-body account-main">
      <Nav />
      <section className="body">
        <Greet />
        <div className="banner">
          <img src={`/imgs/user-icons/${pic}`} alt="" />
        </div>
        <div className="name-sec">
          <h3>{fullname}</h3>
          <small>@{username}</small>
          <p>{bio}</p>
        </div>
        <div className="details-sec">
          <h3>User details...</h3>
          <div className="details">
            <span>
              <FaBirthdayCake /> Born on {newDob || "-- --"}
            </span>
            <span>
              <FaBars /> {numOfMonthTasks} tasks(s) completed this month
            </span>
            <span>
              <FaPhone /> {phone || "--------"}
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
          {filteredTasks.map((task, index) => {
            return <TaskBox task={task} key={index} hideUsers={true} />;
          })}
        </div>
        <br />
        <br />
        <br />
        <Notification notification={notification} />
      </section>
      <UserModal currUser={currUser} />
      <LeaderboardNav />
      <Bell />
      <EditDetailsModal />
      <EditPasswordModal />
      <ChangeAvatarModal />
      <TasksOptions />
    </main>
  );
};

export default Account;
