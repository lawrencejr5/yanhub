import React, { useEffect } from "react";

import Nav from "../components/Nav";
import Back from "../components/Back";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import VidSingleTask from "../components/VidSingleTask";
import AssignModal from "../components/modals/AssignModal";

import { taskTypes } from "../data/tasks";

import { useGlobalContext } from "../Context";

const Task = () => {
  useEffect(() => {
    document.title = "Yanhub - Task";
  }, []);

  const { currVid } = useGlobalContext();
  return (
    <main className="grid-body task-main">
      <Nav />
      <section className="body">
        <Back text={`Assign tasks to ${currVid.showName}(${currVid.ep})`} />
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
