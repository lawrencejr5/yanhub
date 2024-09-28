import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useGlobalContext } from "../Context";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
import SingleShow from "../components/SingleShow";
import CreateShowForm from "../components/modals/CreateShowForm";
import Loading from "../components/Loading";
import Notification from "../components/Notification";
import Empty from "../components/Empty";
import ShowsOptions from "../components/options/ShowsOptions";
import LoadingContainer from "../components/LoadingContainer";

const Videos = () => {
  useEffect(() => {
    document.title = "Yanhub - Shows";
    fetchShows();
  }, []);

  const {
    allShows,
    fetchShows,
    loading,
    notification,
    openCreateVideoModal,
    setOpenCreateVideoModal,
    isAdmin,
  } = useGlobalContext();

  return (
    <main className="videos-main grid-body">
      <Nav />
      <section className="body">
        <Notification notification={notification} />
        <Greet />
        {isAdmin && (
          <div className="createVideoBtn">
            <button onClick={() => setOpenCreateVideoModal(true)}>
              New show &nbsp;
              <FaPlusCircle />
            </button>
          </div>
        )}

        <div className="videos">
          <div className="header">
            <h2>Shows</h2>
          </div>
          {loading ? (
            <LoadingContainer />
          ) : !allShows.length ? (
            <Empty />
          ) : (
            <div className="videos-container">
              {allShows.map((shws, index) => {
                return <SingleShow key={index} shws={shws} />;
              })}
            </div>
          )}
        </div>
      </section>
      <LeaderboardNav />
      <CreateShowForm open={openCreateVideoModal} getShows={fetchShows} />
      <Bell />
      <ShowsOptions />
    </main>
  );
};

export default Videos;
