import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../Context";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
import UserModal from "../components/modals/UserModal";
import SearchBox from "../components/SearchBox";
import TaskBox from "../components/TaskBox";
import SortNav from "../components/SortNav";
import Pagination from "../components/Pagination";
import LoadingContainer from "../components/LoadingContainer";
import TasksOptions from "../components/options/TasksOptions";
import TaskComments from "../components/TaskComments";

const Tasks = () => {
  const {
    fetchTasks,
    fetchTasksByPage,
    tasks,
    searchTasks,
    fetchUsers,
    loading,
    limit,
    page,
    currUser,
  } = useGlobalContext();

  const [query, setQuery] = useState("");
  const [sortVal, setSortVal] = useState("");

  useEffect(() => {
    document.title = "Yanhub - Tasks";
    fetchUsers();
    fetchTasks();
    fetchTasksByPage(limit, page);
  }, []);

  useEffect(() => {
    fetchTasksByPage(limit, page);
  }, [page]);

  useEffect(() => {
    if (!query && !sortVal) {
      fetchTasksByPage(limit, page);
    } else {
      searchTasks(query, sortVal);
    }
  }, [query, sortVal]);

  const navigate = useNavigate();

  // if (loading) return <Loading />;
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
        {loading ? (
          <LoadingContainer />
        ) : (
          <div className="tasks-container">
            {query ? (
              <strong>Search results for {query}</strong>
            ) : sortVal ? (
              <strong>
                All {sortVal} tasks ({tasks.length})
              </strong>
            ) : (
              <strong>Page {page}</strong>
            )}

            {tasks.map((task, index) => {
              return <TaskBox task={task} key={index} />;
            })}
          </div>
        )}

        {sortVal || query ? "" : <Pagination />}
      </section>
      <UserModal currUser={currUser} />
      <LeaderboardNav />
      <Bell />
      <TasksOptions />
      {/* <TaskComments /> */}
    </main>
  );
};

export default Tasks;
