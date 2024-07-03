import React, { createContext, useContext, useState } from "react";

const ContextApp = createContext();
export const Context = ({ children }) => {
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
  const [openCreateVideoModal, setOpenCreateVideoModal] = useState(false);
  const [videoDetailsModal, setVideoDetailsModal] = useState(true);

  return (
    <ContextApp.Provider
      value={{
        openCreateTaskModal,
        setOpenCreateTaskModal,
        openCreateVideoModal,
        setOpenCreateVideoModal,
        videoDetailsModal,
        setVideoDetailsModal,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(ContextApp);
};
