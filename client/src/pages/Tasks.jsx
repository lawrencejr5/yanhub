import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../Context";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
import UserModal from "../components/modals/UserModal";
import SearchBox from "../components/SearchBox";
import Loading from "../components/Loading";
import TaskBox from "../components/TaskBox";
import SortNav from "../components/SortNav";

const Tasks = () => {
  const {
    fetchTasks,
    searchTasks,
    sortTasks,
    fetchUsers,
    loading,
    allTasks,
    currUser,
  } = useGlobalContext();

  const [query, setQuery] = useState("");
  const [sortVal, setSortVal] = useState("");

  useEffect(() => {
    document.title = "Yanhub - Tasks";
    fetchUsers();
    fetchTasks();
  }, []);

  useEffect(() => {
    searchTasks(query);
  }, [query]);

  useEffect(() => {
    sortTasks(sortVal);
  }, [sortVal]);

  const navigate = useNavigate();

  if (loading) return <Loading />;
  return (
    <main className="grid-body tasks-main">
      <Nav />
      <section className="body">
        <Greet />
        <div className="createTaskBtn"></div>
        <div className="header">
          <h2>Tasks</h2>
          <SearchBox what={"tasks"} query={query} queryFunc={setQuery} />

          <div className="tasks-nav">
            <button className="active" onClick={() => navigate("/tasks")}>
              All
            </button>
            <button className="" onClick={() => navigate("/tasks/personal")}>
              Personal
            </button>
          </div>

          <SortNav sortVal={sortVal} setSortVal={setSortVal} />
        </div>
        <div className="tasks-container">
          {allTasks.map((task, index) => {
            return <TaskBox task={task} key={index} />;
          })}
        </div>
      </section>
      <UserModal currUser={currUser} />
      <LeaderboardNav />
      <Bell />
    </main>
  );
};

export default Tasks;
