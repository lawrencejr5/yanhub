import React, { useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
const Tasks = () => {
  useEffect(() => {
    document.title = "Yanhub - Tasks";
  }, []);

  return (
    <main className="grid-body tasks-main">
      <Nav />
      <section className="body">
        <Greet />
        <div className="createTaskBtn">
          <button>
            Create &nbsp;
            <FaPlusCircle />
          </button>
        </div>
        <div className="tasks">
          <h2>Tasks</h2>
        </div>
      </section>
      <LeaderboardNav />
      <Bell />
    </main>
  );
};

export default Tasks;
