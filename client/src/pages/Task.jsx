import React, { useEffect } from "react";
import Back from "../components/Back";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import VidSingleTask from "../components/VidSingleTask";

import { taskTypes } from "../data/tasks";
const Task = () => {
  useEffect(() => {
    document.title = "Yanhub - Task";
  }, []);
  return (
    <main className="grid-body task-main">
      <Nav />
      <section className="body">
        <Back text={"Tasks for Gbam"} />
        <div className="task-container">
          {taskTypes.map((task, index) => {
            return <VidSingleTask task={task} />;
          })}
        </div>
      </section>
      <LeaderboardNav />
      <Bell />
    </main>
  );
};

export default Task;
