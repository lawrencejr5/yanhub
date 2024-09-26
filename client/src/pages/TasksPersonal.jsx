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
import Pagination from "../components/Pagination";
import LoadingContainer from "../components/LoadingContainer";
import TasksOptions from "../components/options/TasksOptions";

const TasksPersonal = () => {
  const { allTasks, fetchTasks, searchPersonalTasks, loading, currUser } =
    useGlobalContext();

  const [query, setQuery] = useState("");
  const [sortVal, setSortVal] = useState("");

  useEffect(() => {
    document.title = "Yanhub - Tasks";
    fetchTasks();
  }, []);

  useEffect(() => {
    searchPersonalTasks(query, sortVal);
  }, [query, sortVal]);

  const userId = localStorage.getItem("user");
  const filteredTasks = allTasks.filter((task) => {
    return task.assignedTo.some((usr) => usr._id === userId);
  });
  const navigate = useNavigate();

  // if (loading) return <Loading />;

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

          <SortNav sortVal={sortVal} setSortVal={setSortVal} />
        </div>
        {loading ? (
          <LoadingContainer />
        ) : (
          <div className="tasks-container">
            {filteredTasks.length === 0 ? (
              <Empty />
            ) : (
              filteredTasks.map((task, index) => {
                return <TaskBox task={task} key={index} />;
              })
            )}
          </div>
        )}
      </section>
      <LeaderboardNav />
      <UserModal currUser={currUser} />
      <Bell />
      <TasksOptions />
    </main>
  );
};

export default TasksPersonal;
