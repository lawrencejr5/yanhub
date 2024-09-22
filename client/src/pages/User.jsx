import React, { useEffect, useState } from "react";
import { FaPhone, FaBirthdayCake, FaBars } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Back from "../components/Back";
import TaskBox from "../components/TaskBox";
import Loading from "../components/Loading";
import UserModal from "../components/modals/UserModal";

import { useGlobalContext } from "../Context";

const User = () => {
  const [user, setUser] = useState([]);
  const { username, pic, bio, phone, dob } = user;

  const {
    loading,
    setLoading,
    endpoint,
    fetchTasks,
    allTasks,
    currUser,
    getTasksCompletedPerMonth,
    numOfMonthTasks,
  } = useGlobalContext();

  useEffect(() => {
    document.title = `Yanhub - ${username}`;
    getUser();
    fetchTasks();
    getTasksCompletedPerMonth(currUser._id);
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

  let newDob;
  const date = new Date(dob);
  if (!isNaN(date)) {
    newDob = format(date, "MMMM do");
  }

  const filteredTasks = allTasks.filter((task) => {
    return task.assignedTo.some((usr) => usr._id === id);
  });

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
              <FaBirthdayCake /> Born on {newDob || "-- --"}
            </span>
            {/* <span>
              <FaBars /> {numOfMonthTasks} task(s) completed this month
            </span> */}
            <span>
              <FaPhone /> {phone || "--------"}
            </span>
          </div>
        </div>
        <div className="tasks-sec">
          <h3>{`${username}'s tasks...`}</h3>
          {filteredTasks.map((task, index) => {
            return <TaskBox task={task} hideUsers={true} key={index} />;
          })}
        </div>
      </section>
      <LeaderboardNav />
      <UserModal currUser={currUser} />
      <Bell />
    </main>
  );
};

export default User;
