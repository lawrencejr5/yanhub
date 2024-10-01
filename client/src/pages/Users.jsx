import React, { useEffect, useState } from "react";
import axios from "axios";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
import SearchBox from "../components/SearchBox";
import UserModal from "../components/modals/UserModal";
import LoadingContainer from "../components/LoadingContainer";
import Notification from "../components/Notification";
import Empty from "../components/Empty";

import { useGlobalContext } from "../Context";

const Users = () => {
  const [editors, setEditors] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [currUser, setCurrUser] = useState([]);

  const [query, setQuery] = useState([]);

  const { endpoint, loading, setLoading, setUserModal, notification } =
    useGlobalContext();

  useEffect(() => {
    document.title = "Yanhub - Users";
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [query]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${endpoint}/users/?search=${query}`);

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

  return (
    <main className="grid-body users-main">
      <Nav />
      <section className="body">
        <Greet />
        <Notification notification={notification} />
        <SearchBox what={"users"} query={query} queryFunc={setQuery} />

        <h1>YanHub Users</h1>
        {loading ? (
          <LoadingContainer />
        ) : (
          <>
            <div className="admins-container">
              <h3>Admins</h3>
              {!admins.length
                ? "..."
                : admins.map((admin, index) => {
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
              {!editors.length
                ? "..."
                : editors.map((editor, index) => {
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
          </>
        )}
      </section>
      <UserModal currUser={currUser} />
      <LeaderboardNav />
      <Bell />
    </main>
  );
};

export default Users;
