import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Nav from "../components/Nav";
import Back from "../components/Back";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Loading from "../components/Loading";
import TaskBox from "../components/TaskBox";
import UserModal from "../components/modals/UserModal";

import { useGlobalContext } from "../Context";
import TaskNav from "../components/TaskNav";

const ShowTasks = () => {
  const { currVid, allTasks, fetchTasks, getVidDetails, loading, currUser } =
    useGlobalContext();

  const { id } = useParams();

  useEffect(() => {
    document.title = "Yanhub - Task";
    getVidDetails(id);
    fetchTasks();
  }, []);

  const filteredTasks = allTasks.filter((task) => task.vidId === id);

  if (loading) return <Loading />;
  return (
    <main className="grid-body task-main">
      <Nav />
      <section className="body">
        <Back text={`Tasks under ${currVid.showName}(${currVid.ep})`} />
        <TaskNav currVid={currVid} />
        {filteredTasks.map((task, index) => {
          return <TaskBox task={task} key={index} />;
        })}
      </section>
      <UserModal currUser={currUser} />
      <LeaderboardNav />
      <Bell />
    </main>
  );
};

export default ShowTasks;
