import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ContextApp = createContext();
export const Context = ({ children }) => {
  // Modals
  // const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
  const [openCreateVideoModal, setOpenCreateVideoModal] = useState(false);
  const [videoDetailsModal, setVideoDetailsModal] = useState(false);
  const [vidDetailsId, setVidDetailsId] = useState(1);
  const [assignModal, setAssignModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [userForUserModal, setUserForUserModal] = useState("lawrencejr");
  const [editPassModal, setEditPassModal] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);

  //Notification
  const [notification, setNotification] = useState({
    text: "",
    status: "",
    theme: "",
  });
  useEffect(() => {
    const notTimeout = setTimeout(() => {
      setNotification({ ...notification, status: false });
    }, 2000);
    return () => clearTimeout(notTimeout);
  }, [notification]);

  // Loading
  const [loading, setLoading] = useState(false);
  const [btnLoad, setBtnLoad] = useState(false);

  // Logged in user
  const [loggedIn, setLoggedIn] = useState("lawrencejr");
  const [signedIn, setSignedIn] = useState({});
  const [personalTasks, setPersonalTasks] = useState({});

  // Dark mode
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // Endpoint
  const endpoint = "http://localhost:5001/api/v1";

  const fetchUser = async () => {
    const userId = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const { data } = await axios.get(`${endpoint}/users/${userId}`);
      setSignedIn(data.user);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <ContextApp.Provider
      value={{
        // openCreateTaskModal,
        // setOpenCreateTaskModal,
        openCreateVideoModal,
        setOpenCreateVideoModal,
        videoDetailsModal,
        setVideoDetailsModal,
        vidDetailsId,
        setVidDetailsId,
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
        setSignedIn,
        //
        fetchUser,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(ContextApp);
};
