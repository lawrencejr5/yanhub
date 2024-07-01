import React, { useEffect } from "react";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
import SearchBox from "../components/SearchBox";

const Users = () => {
  useEffect(() => {
    document.title = "Yanhub - Users";
  }, []);
  return (
    <main className="grid-body users-main">
      <Nav />
      <section className="body">
        <Greet />
        <SearchBox />
        <h1>YanHub Users</h1>
      </section>
      <LeaderboardNav />
      <Bell />
    </main>
  );
};

export default Users;
