import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Nav from "../components/Nav";
import Back from "../components/Back";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import VidSingleTask from "../components/VidSingleTask";
import AssignModal from "../components/modals/AssignModal";
import Loading from "../components/Loading";
import Notification from "../components/Notification";
import TaskNav from "../components/TaskNav";

import { taskTypes } from "../data/tasks";

import { useGlobalContext } from "../Context";
import LoadingContainer from "../components/LoadingContainer";

const AssignTask = () => {
  const {
    currVid,
    assignTask,
    getVidDetails,
    fetchUsers,
    loading,
    notification,
  } = useGlobalContext();

  const { id } = useParams();

  useEffect(() => {
    document.title = "Yanhub - Task";
    getVidDetails(id);
    fetchUsers();
  }, []);

  return (
    <main className="grid-body task-main">
      <Nav />
      {loading ? (
        <LoadingContainer />
      ) : (
        <section className="body">
          <Notification notification={notification} />
          <Back text={`Assign tasks to ${currVid.ep}`} />
          <div className="task-container">
            {taskTypes.map((task, index) => {
              return <VidSingleTask key={index} task={task} />;
            })}
          </div>
        </section>
      )}

      <LeaderboardNav />
      <Bell />
      <AssignModal assignTask={assignTask} />
    </main>
  );
};

export default AssignTask;
