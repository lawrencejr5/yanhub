import React, { createContext, useContext, useState } from "react";

const ContextApp = createContext();
export const Context = ({ children }) => {
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
  const [openCreateVideoModal, setOpenCreateVideoModal] = useState(false);
  const [videoDetailsModal, setVideoDetailsModal] = useState(false);
  const [vidDetailsId, setVidDetailsId] = useState(1);
  return (
    <ContextApp.Provider
      value={{
        openCreateTaskModal,
        setOpenCreateTaskModal,
        openCreateVideoModal,
        setOpenCreateVideoModal,
        videoDetailsModal,
        setVideoDetailsModal,
        vidDetailsId,
        setVidDetailsId,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(ContextApp);
};
