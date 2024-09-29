import React, { useEffect, useState } from "react";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import MyTasksLayout from "../components/MyTasksLayout";
import Loading from "../components/Loading";
import Greet from "../components/Greet";
import Announcements from "../components/Announcements";

import { currMonth, currYear } from "../data/date";

import { useGlobalContext } from "../Context";
const Dashboard = () => {
  const {
    signedIn,
    leaderboard,
    loading,
    fetchTasks,
    allTasks,
    getTasksCompletedPerMonth,
    numOfMonthTasks,
  } = useGlobalContext();

  useEffect(() => {
    document.title = "Yanhub - Dashboard";
    fetchTasks(currMonth, currYear);
    const userId = localStorage.getItem("user");
    getTasksCompletedPerMonth(userId);
  }, []);

  const filteredTasks = allTasks.filter((task) =>
    task.assignedTo.some((usr) => usr._id === signedIn._id)
  );

  const latestTask = filteredTasks[filteredTasks.length - 1];

  if (loading) return <Loading />;

  return (
    <main className="grid-body dashboard-main">
      <Nav />
      <section className="body">
        <Greet />
        <h2 className="heading">Your Dashboard</h2>
        <div className="layout">
          <div className="layout1">
            <div className="total-xp">
              <h3>Tasks completed this month</h3>
              <br />
              <strong>{numOfMonthTasks} Task(s)</strong>
            </div>
            {leaderboard.map((users, index) => {
              if (users.userId === localStorage.getItem("user"))
                return (
                  <div className="position" key={index}>
                    <h3>Position</h3>
                    <strong>#{index + 1}</strong>
                  </div>
                );
            })}
          </div>
          <div className="layout2">
            <h2>Latest Task</h2>
            {filteredTasks.length === 0 ? (
              <>
                <h4>-----</h4>
                <br />
                <p>Ep: ----</p>
                <p>Type: ---</p>
                <p>Duration: ---</p>
              </>
            ) : (
              <>
                <h4>{latestTask.video.show.show}</h4>
                <br />
                <p>Ep: {latestTask.video.ep}</p>
                <p>Type: {latestTask.type}</p>
                <p>Duration: {latestTask.video.duration}</p>
              </>
            )}
          </div>
        </div>
        <Announcements />
        <MyTasksLayout />
        <br />
        <br />
        <br />
      </section>
      <LeaderboardNav />
      <Bell />
    </main>
  );
};

export default Dashboard;
