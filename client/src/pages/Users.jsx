import React, { useEffect } from "react";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
import SearchBox from "../components/SearchBox";

import { users } from "../data/users";
import { useNavigate } from "react-router-dom";

const Users = () => {
  useEffect(() => {
    document.title = "Yanhub - Users";
  }, []);

  const navigate = useNavigate();

  const admins = users.filter((user) => user.admin === true);
  const editors = users.filter((user) => user.admin === false);

  return (
    <main className="grid-body users-main">
      <Nav />
      <section className="body">
        <Greet />
        <SearchBox />
        <h1>YanHub Users</h1>
        <div className="admins-container">
          <h3>Admins</h3>
          {admins.map((admin, index) => {
            const { username, pic, role } = admin;
            return (
              <div
                className="user-box"
                id="admin"
                key={index}
                onClick={() => navigate(`/user/${username}`)}
              >
                <img src={`/imgs/user/${pic}`} alt="" />
                <p>{username}</p>
                <small>{role}</small>
              </div>
            );
          })}
        </div>
        <div className="admins-container">
          <h3>Editors</h3>
          {editors.map((editor, index) => {
            const { username, pic, role } = editor;
            return (
              <div
                className="user-box"
                id="editor"
                key={index}
                onClick={() => navigate(`/user/${username}`)}
              >
                <img src={`/imgs/user/${pic}`} alt="" />
                <p>{username}</p>
                <small>{role}</small>
              </div>
            );
          })}
        </div>
      </section>
      <LeaderboardNav />
      <Bell />
    </main>
  );
};

export default Users;
