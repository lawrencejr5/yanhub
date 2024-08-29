import React, { createContext, useContext, useState, useEffect } from "react";

const ContextApp = createContext();
export const Context = ({ children }) => {
  // Modals
  // const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
  // const [openCreateVideoModal, setOpenCreateVideoModal] = useState(false);
  const [videoDetailsModal, setVideoDetailsModal] = useState(false);
  const [vidDetailsId, setVidDetailsId] = useState(1);
  const [assignModal, setAssignModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [userForUserModal, setUserForUserModal] = useState("lawrencejr");

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

  // Dark mode
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // Endpoint
  const endpoint = "http://localhost:5000/api/v1";

  return (
    <ContextApp.Provider
      value={{
        // openCreateTaskModal,
        // setOpenCreateTaskModal,
        // openCreateVideoModal,
        // setOpenCreateVideoModal,
        endpoint,
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
        loggedIn,
        setLoggedIn,
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
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(ContextApp);
};
