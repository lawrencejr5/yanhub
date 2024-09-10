import React, { useEffect, useState } from "react";
import axios from "axios";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
import SearchBox from "../components/SearchBox";
import UserModal from "../components/modals/UserModal";
import Loading from "../components/Loading";

import { users } from "../data/users";

import { useGlobalContext } from "../Context";

const Users = () => {
  const [editors, setEditors] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [currUser, setCurrUser] = useState([]);

  useEffect(() => {
    document.title = "Yanhub - Users";
    fetchUsers();
  }, []);

  const { endpoint, loading, setLoading, setUserModal } = useGlobalContext();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${endpoint}/users/`);

      const admins = data.users.filter((user) => user.admin === true);
      setAdmins(admins);

      const editors = data.users.filter((user) => user.admin === false);
      setEditors(editors);

      setLoading(false);
      setAllUsers(data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const clickFunc = (user) => {
    setUserModal(true);

    const usr = allUsers.find((usr) => usr._id === user);
    setCurrUser(usr);
  };

  if (loading) return <Loading />;
  return (
    <main className="grid-body users-main">
      <Nav />
      <section className="body">
        <Greet />
        <SearchBox what={"users"} />

        <h1>YanHub Users</h1>
        <div className="admins-container">
          <h3>Admins</h3>
          {admins.map((admin, index) => {
            const { _id: userId, username, pic, role } = admin;
            return (
              <div
                className="user-box"
                id="admin"
                key={index}
                onClick={() => clickFunc(userId)}
              >
                <img src={`/imgs/user-icons/${pic}`} alt="" />
                <p>{username}</p>
                <small>{role}</small>
              </div>
            );
          })}
        </div>
        <div className="admins-container">
          <h3>Editors</h3>
          {editors.map((editor, index) => {
            const { _id: userId, username, pic, role } = editor;
            return (
              <div
                className="user-box"
                id="editor"
                key={index}
                onClick={() => clickFunc(userId)}
              >
                <img src={`/imgs/user-icons/${pic}`} alt="" />
                <p>{username}</p>
                <small>{role}</small>
              </div>
            );
          })}
        </div>
      </section>
      <UserModal currUser={currUser} />
      <LeaderboardNav />
      <Bell />
    </main>
  );
};

export default Users;
