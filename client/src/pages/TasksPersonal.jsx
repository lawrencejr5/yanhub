import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../Context";

import { currMonth, currYear } from "../data/date";

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
import Notification from "../components/Notification";

const TasksPersonal = () => {
  const {
    allTasks,
    fetchTasks,
    searchPersonalTasks,
    loading,
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
    if (thisMonth) {
      searchPersonalTasks(query, sortVal, currMonth, currYear);
    } else {
      searchPersonalTasks(query, sortVal);
    }
  }, [query, sortVal, thisMonth]);

  useEffect(() => {
    localStorage.setItem("tmsrt", thisMonth);
  }, [thisMonth]);

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
                return <TaskBox task={task} personal={true} key={index} />;
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
