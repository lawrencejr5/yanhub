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

  // Leaderboard
  const [leaderboard, setLeaderbord] = useState([]);

  // Logged in user
  const [loggedIn, setLoggedIn] = useState("lawrencejr");
  const [signedIn, setSignedIn] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // All data
  const [allUsers, setAllUsers] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [videos, setVideos] = useState([]);

  // User states
  const [currUser, setCurrUser] = useState([]);

  // Video states
  const [currVid, setCurrVid] = useState([]);

  // Shows states
  const [currShow, setCurrShow] = useState([]);

  // Tasks states
  const [tasks, setTasks] = useState([]);
  const [checked, setChecked] = useState(null);
  const [numOfMonthTasks, setNumOfMonthTasks] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 20;

  // Dark mode
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  // Dark/Light mode toggle function
  const toggleTheme = () => {
    setTheme((prev) => {
      return prev === "light" ? "dark" : "light";
    });
    if (theme === "light") {
      setNotification({
        text: "Theme set to dark mode",
        status: "true",
        theme: "success",
      });
    }
    if (theme === "dark") {
      setNotification({
        text: "Theme set to light mode",
        status: "true",
        theme: "success",
      });
    }
  };

  // Endpoint and token
  const endpoint = "http://localhost:5000/api/v1";
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    const userId = localStorage.getItem("user");
    try {
      setLoading(true);
      const { data } = await axios.get(`${endpoint}/users/${userId}`);
      setSignedIn(data.user);
      setIsAdmin(data.user.admin);
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

  const getLeaderBoardRanking = async () => {
    try {
      // setLoading(true);
      const { data } = await axios.get(`${endpoint}/users/leaderboard`);
      setLeaderbord(data.rankings);
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTasksByPage = async (limit, page) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${endpoint}/tasks?limit=${limit}&page=${page}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(data.tasks);
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

  const searchTasks = async (query, status) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${endpoint}/tasks?search=${query}&status=${status}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(data.tasks);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const searchPersonalTasks = async (query, status) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${endpoint}/tasks?search=${query}&status=${status}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAllTasks(data.tasks);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getTasksCompletedPerMonth = async (userId) => {
    const d = new Date();
    const monthVal = d.getMonth();
    const month = monthVal < 10 ? `0${monthVal + 1}` : `${monthVal + 1}`;
    try {
      setLoading(true);
      const { data } = await axios.get(`${endpoint}/tasks?status=completed`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const monthTasksFilter = data.tasks.filter(
        (task) => task.createdAt.split("-")[1] === month
      );
      const filteredTasks = monthTasksFilter.filter((task) =>
        task.assignedTo.some((usr) => usr._id === userId)
      );
      setNumOfMonthTasks(filteredTasks.length);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getVideos = async (show, status) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${endpoint}/videos?show=${show}&status=${status || ""}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setVideos(data.videos);
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
    fetchTasksByPage(limit, page);
  }, []);

  useEffect(() => {
    getLeaderBoardRanking();
  }, [tasks]);

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
        toggleTheme,
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
        isAdmin,
        leaderboard,
        //
        allTasks,
        tasks,
        setTasks,
        //
        videos,
        setSignedIn,
        currVid,
        currUser,
        setCurrUser,
        currShow,
        assignTask,
        setAssignTask,
        //
        limit,
        page,
        setPage,
        //
        checked,
        setChecked,
        //
        getTasksCompletedPerMonth,
        numOfMonthTasks,
        //
        fetchUser,
        fetchUsers,
        fetchTasks,
        fetchTasksByPage,
        searchTasks,
        searchPersonalTasks,
        getVideos,
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
