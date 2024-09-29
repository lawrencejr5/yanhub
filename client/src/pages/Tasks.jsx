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
// import TaskComments from "../components/TaskComments";
import Notification from "../components/Notification";
import Empty from "../components/Empty";

import { currMonth, currYear } from "../data/date";

const Tasks = () => {
  const {
    fetchTasks,
    fetchTasksByPage,
    tasks,
    allTasks,
    searchTasks,
    fetchUsers,
    loading,
    limit,
    page,
    currUser,
    notification,
  } = useGlobalContext();

  const [query, setQuery] = useState("");
  const [sortVal, setSortVal] = useState("");
  const [thisMonth, setThisMonth] = useState(
    localStorage.getItem("tmsrt") === "true"
  );

  useEffect(() => {
    document.title = "Yanhub - Tasks";
  }, []);

  useEffect(() => {
    fetchUsers();
    if (thisMonth) {
      searchTasks(currMonth, currYear);
      fetchTasks(currMonth, currYear);
      fetchTasksByPage(limit, page, currMonth, currYear);
    } else {
      fetchTasks();
      fetchTasksByPage(limit, page);
    }
  }, [thisMonth, limit, page]);

  useEffect(() => {
    fetchTasksByPage(limit, page);
  }, [page, limit]);

  useEffect(() => {
    if (thisMonth) {
      searchTasks(query, sortVal, currMonth, currYear);
    } else if (!query && !sortVal) {
      fetchTasksByPage(limit, page);
    } else {
      searchTasks(query, sortVal);
    }
  }, [query, sortVal, thisMonth, limit, page]);

  useEffect(() => {
    localStorage.setItem("tmsrt", thisMonth);
  }, [thisMonth]);
  const navigate = useNavigate();

  return (
    <main className="grid-body tasks-main">
      <Nav />
      <section className="body">
        <Greet />
        <Notification notification={notification} />
        <div className="task-header">
          <div className="separate">
            <h2>Tasks</h2>
            <div className="inp-holder tm-sort">
              <label htmlFor="">{currMonth} alone</label>&nbsp;&nbsp;
              <input
                type="checkbox"
                checked={thisMonth}
                onChange={() => setThisMonth((prev) => !prev)}
              />
            </div>
          </div>

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
            ) : allTasks.length > limit ? (
              <strong>Page {page}</strong>
            ) : (
              ""
            )}

            {!tasks.length ? (
              <>
                <br />
                <br />
                <Empty />
              </>
            ) : (
              tasks.map((task, index) => {
                return <TaskBox task={task} key={index} />;
              })
            )}
          </div>
        )}

        {sortVal || query ? "" : <Pagination />}
      </section>
      <UserModal currUser={currUser} />
      <LeaderboardNav />
      <Bell />
      <TasksOptions />
    </main>
  );
};

export default Tasks;
