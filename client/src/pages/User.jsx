import React, { useEffect, useState } from "react";
import { FaPhone, FaBirthdayCake, FaThumbsUp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Back from "../components/Back";
import TaskBox from "../components/TaskBox";

import { useGlobalContext } from "../Context";
import Loading from "../components/Loading";

const Account = () => {
  const [user, setUser] = useState([]);
  const { loading, setLoading, endpoint, fetchTasks, allTasks } =
    useGlobalContext();

  useEffect(() => {
    document.title = "Yanhub - My Account";
    getUser();
    fetchTasks();
  }, []);

  const { id } = useParams();
  const getUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${endpoint}/users/${id}`);
      setUser(data.user);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const { username, pic, bio, phone } = user;

  const filteredTasks = allTasks.filter((task) => task.assignedTo.includes(id));

  if (loading) return <Loading />;
  return (
    <main className="grid-body account-main">
      <Nav />
      <section className="body">
        <Back text={`@${username}`} />
        <div className="banner">
          <img src={`/imgs/user-icons/${pic}`} alt="" />
        </div>
        <div className="name-sec">
          <h3>{user.fullname}</h3>
          <small>{`@${username}`}</small>
          <p>{bio}</p>
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
              <FaPhone /> {phone || "--------"}
            </span>
          </div>
        </div>
        <div className="tasks-sec">
          <h3>{`${username}'s tasks...`}</h3>
          {filteredTasks.map((task, index) => {
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
