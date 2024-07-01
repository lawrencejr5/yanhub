import React, { useEffect } from "react";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import MyTasksLayout from "../components/MyTasksLayout";
// import UsersHighlights from "../components/UsersHighlights";
import Greet from "../components/Greet";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Yanhub - Dashboard";
  }, []);

  return (
    <main className="grid-body dashboard-main">
      <Nav />
      <section className="body">
        <Greet />
        <h2 className="heading">Your Dashboard</h2>
        <div className="layout">
          <div className="layout1">
            <div className="total-xp">
              <h3>Total XP this month</h3>
              <strong>1756XP</strong>
            </div>
            <div className="position">
              <h3>Position</h3>
              <strong>3rd</strong>
            </div>
          </div>
          <div className="layout2">
            <h2>Current Task</h2>
            <h4>Obiagelli Studio</h4>
            <br />
            <p>Type: Subtitle</p>
            <p>Duration: 2hr: 06min</p>
            <p>Day 5</p>
          </div>
        </div>
        {/* <UsersHighlights /> */}
        <MyTasksLayout />
      </section>
      <LeaderboardNav />
      <Bell />
    </main>
  );
};

export default Dashboard;
