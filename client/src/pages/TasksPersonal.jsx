import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../Context";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
import TaskBox from "../components/TaskBox";
import SearchBox from "../components/SearchBox";
import Loading from "../components/Loading";
import Empty from "../components/Empty";
import UserModal from "../components/modals/UserModal";
import SortNav from "../components/SortNav";

const TasksPersonal = () => {
  const { allTasks, fetchTasks, searchTasks, loading, currUser } =
    useGlobalContext();

  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Yanhub - Tasks";
    fetchTasks();
  }, []);

  useEffect(() => {
    searchTasks(query);
  }, [query]);

  const userId = localStorage.getItem("user");
  const filteredTasks = allTasks.filter((task) => {
    return task.assignedTo.some((usr) => usr._id === userId);
  });
  const navigate = useNavigate();

  if (loading) return <Loading />;

  return (
    <main className="grid-body tasks-main">
      <Nav />
      <section className="body">
        <Greet />
        <div className="header">
          <h2>Tasks</h2>
          <SearchBox
            what={"personal tasks"}
            query={query}
            queryFunc={setQuery}
          />

          <div className="tasks-nav">
            <button className="" onClick={() => navigate("/tasks")}>
              All
            </button>
            <button
              className="active"
              onClick={() => navigate("/tasks/personal")}
            >
              Personal
            </button>
          </div>

          <SortNav />
        </div>
        <div className="tasks-container">
          {filteredTasks.length === 0 ? (
            <Empty />
          ) : (
            filteredTasks.map((task, index) => {
              return <TaskBox task={task} key={index} />;
            })
          )}
        </div>
      </section>
      <LeaderboardNav />
      <UserModal currUser={currUser} />
      <Bell />
    </main>
  );
};

export default TasksPersonal;
