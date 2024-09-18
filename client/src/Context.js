import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ContextApp = createContext();
export const Context = ({ children }) => {
  // Modals & nav
  const [mobileNav, setMobileNav] = useState(false);
  const [openCreateVideoModal, setOpenCreateVideoModal] = useState(false);
  const [videoDetailsModal, setVideoDetailsModal] = useState(false);
  const [assignModal, setAssignModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [userForUserModal, setUserForUserModal] = useState("");
  const [editPassModal, setEditPassModal] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);

  const [assignTask, setAssignTask] = useState("");

  //Notification
  const [notification, setNotification] = useState({
    text: "",
    status: "",
    theme: "",
  });
  useEffect(() => {
    const notiTimeout = setTimeout(() => {
      setNotification({ ...notification, status: false });
    }, 2000);
    return () => clearTimeout(notiTimeout);
  }, [notification]);

  // Loading
  const [loading, setLoading] = useState(false);
  const [btnLoad, setBtnLoad] = useState(false);

  // Logged in user
  const [loggedIn, setLoggedIn] = useState("lawrencejr");
  const [signedIn, setSignedIn] = useState({});

  // All data
  const [allUsers, setAllUsers] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  // User states
  const [currUser, setCurrUser] = useState([]);

  // Video states
  const [currVid, setCurrVid] = useState({});

  // Shows states
  const [currShow, setCurrShow] = useState({});

  // Tasks states
  const [checked, setChecked] = useState(null);

  // Dark mode
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // Endpoint and token
  const endpoint = "http://localhost:5001/api/v1";
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    const userId = localStorage.getItem("user");
    try {
      setLoading(true);
      const { data } = await axios.get(`${endpoint}/users/${userId}`);
      setSignedIn(data.user);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${endpoint}/users`);
      setAllUsers(data.users);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${endpoint}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllTasks(data.tasks);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const searchTasks = async (query) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${endpoint}/tasks?search=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllTasks(data.tasks);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getVidDetails = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${endpoint}/videos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrVid(data.video);
      setLoading(false);
    } catch (err) {
      const {
        response: { data },
      } = err;
      console.log(data);
    }
  };

  const getShowById = async (id) => {
    try {
      const { data } = await axios.get(`${endpoint}/shows/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrShow(data.shows);
    } catch (err) {
      const {
        response: { data },
      } = err;
      console.log(data);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchUsers();
    fetchTasks();
  }, []);

  return (
    <ContextApp.Provider
      value={{
        openCreateVideoModal,
        setOpenCreateVideoModal,
        videoDetailsModal,
        setVideoDetailsModal,
        assignModal,
        setAssignModal,
        userModal,
        setUserModal,
        userForUserModal,
        setUserForUserModal,
        editModal,
        setEditModal,
        editPassModal,
        setEditPassModal,
        avatarModal,
        setAvatarModal,
        //
        loggedIn,
        setLoggedIn,
        endpoint,
        token,
        theme,
        setTheme,
        mobileNav,
        setMobileNav,
        notification,
        setNotification,
        btnLoad,
        setBtnLoad,
        loading,
        setLoading,
        //
        signedIn,
        allUsers,
        allTasks,
        setSignedIn,
        currVid,
        currUser,
        setCurrUser,
        searchTasks,
        currShow,
        assignTask,
        setAssignTask,
        checked,
        setChecked,
        //
        fetchUser,
        fetchUsers,
        fetchTasks,
        getVidDetails,
        getShowById,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(ContextApp);
};
