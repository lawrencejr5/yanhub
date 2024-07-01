import React, { useEffect } from "react";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
const Account = () => {
  useEffect(() => {
    document.title = "Yanhub - My Account";
  }, []);
  return (
    <main className="grid-body account-main">
      <Nav />
      <section className="">
        <Greet></Greet>
      </section>
      <LeaderboardNav />
      <Bell />
    </main>
  );
};

export default Account;
