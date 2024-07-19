import React, { useEffect } from "react";

import Nav from "../components/Nav";
import Back from "../components/Back";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import VidSingleTask from "../components/VidSingleTask";
import AssignModal from "../components/AssignModal";

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
            return <VidSingleTask key={index} task={task} />;
          })}
        </div>
      </section>
      <LeaderboardNav />
      <Bell />
      <AssignModal />
    </main>
  );
};

export default Task;
