import React, { useEffect } from "react";
import { FaPhone, FaBirthdayCake, FaThumbsUp } from "react-icons/fa";
import { useParams } from "react-router-dom";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Back from "../components/Back";
import TaskBox from "../components/TaskBox";

import { users } from "../data/users";
import { tasks } from "../data/tasks";

const Account = () => {
  useEffect(() => {
    document.title = "Yanhub - My Account";
  }, []);

  const { username } = useParams();
  const user = users.find((usr) => usr.username === username);
  const { pic } = user;

  const userTasks = tasks.filter((task) => task.users.includes(username));
  return (
    <main className="grid-body account-main">
      <Nav />
      <section className="body">
        <Back text={`@${username}`} />
        <div className="banner">
          <img src={`/imgs/user/${pic}`} alt="" />
        </div>
        <div className="name-sec">
          <h3>{user.fullname}</h3>
          <small>{`@${username}`}</small>
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
          </div>
        </div>
        <div className="tasks-sec">
          <h3>{`${username}'s tasks...`}</h3>
          {userTasks.map((task, index) => {
            return <TaskBox task={task} key={index} />;
          })}
        </div>
      </section>
      <LeaderboardNav />
      <Bell />
    </main>
  );
};

export default Account;
