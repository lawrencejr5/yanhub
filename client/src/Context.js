import React, { createContext, useContext, useState } from "react";

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
  const [userForUserModal, setUserForUserModal] = useState("lawrencejr");

  // Logged in user
  const [loggedIn, setLoggedIn] = useState("kelechi");
  // Dark mode
  const [isDark, setIsDark] = useState(false);
  return (
    <ContextApp.Provider
      value={{
        // openCreateTaskModal,
        // setOpenCreateTaskModal,
        // openCreateVideoModal,
        // setOpenCreateVideoModal,
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
        isDark,
        setIsDark,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(ContextApp);
};
