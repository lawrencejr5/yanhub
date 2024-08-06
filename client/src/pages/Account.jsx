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
import TaskBox from "../components/TaskBox";

const Account = () => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    document.title = "Yanhub - My Account";
  }, []);
  useEffect(() => {}, [isDark]);
  const setDark = () => {
    document.body.className = isDark ? "" : "dark";
    setIsDark((prev) => {
      return !prev;
    });
  };
  return (
    <main className="grid-body account-main">
      <Nav />
      <section className="body">
        <Greet />
        <div className="banner">
          <img src="/imgs/user/user-12.png" alt="" />
        </div>
        <div className="name-sec">
          <h3>Oputa Ifeanyi Lawrence</h3>
          <small>@lawrencejr</small>
          <p>I am the developer of yanhub</p>
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
              <button>Edit details...</button>
            </div>
          </div>
        </div>
        <div className="set-sec">
          <h3>Settings...</h3>
          <div className="set-item">
            <span>Set light/dark mode</span>
            <button onClick={() => setDark()}>
              {isDark ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
        <div className="tasks-sec">
          <h3>Your tasks...</h3>
          {/* <TaskBox /> */}
        </div>
      </section>
      <LeaderboardNav />
      <Bell />
    </main>
  );
};

export default Account;
