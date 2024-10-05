import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Nav from "../components/Nav";
import Back from "../components/Back";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Loading from "../components/Loading";
import TaskBox from "../components/TaskBox";
import UserModal from "../components/modals/UserModal";
import Empty from "../components/Empty";
import TasksOptions from "../components/options/TasksOptions";
import Notification from "../components/Notification";
import LoadingContainer from "../components/LoadingContainer";
import TaskNav from "../components/TaskNav";

import { useGlobalContext } from "../Context";

const ShowTasks = () => {
  const { id } = useParams();

  const {
    currVid,
    allTasks,
    fetchTasks,
    getVidDetails,
    loading,
    currUser,
    isAdmin,
    notification,
  } = useGlobalContext();

  useEffect(() => {
    document.title = "Yanhub - Task";
    getVidDetails(id);
    fetchTasks();
  }, []);

  const filteredTasks = allTasks.filter((task) => task.video._id === id);

  return (
    <main className="grid-body task-main">
      <Nav />
      <section className="body">
        <Notification notification={notification} />
        <Back
          text={`Tasks under ${currVid.length === 0 ? "" : currVid.show.show}(${
            currVid.ep
          })`}
        />
        {!isAdmin ? "" : <TaskNav currVid={currVid} />}

        {loading ? (
          <LoadingContainer full={true} />
        ) : filteredTasks.length === 0 ? (
          <>
            <br />
            <br />
            <Empty />
          </>
        ) : (
          filteredTasks.map((task, index) => {
            return <TaskBox task={task} key={index} />;
          })
        )}
      </section>
      <UserModal currUser={currUser} />
      <LeaderboardNav />
      <Bell />
      <TasksOptions />
    </main>
  );
};

export default ShowTasks;
