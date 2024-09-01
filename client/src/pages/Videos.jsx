import React, { useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";

import { useGlobalContext } from "../Context";

import { shows } from "../data/videos";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
import SingleShow from "../components/SingleShow";
import CreateShowForm from "../components/modals/CreateShowForm";

const Videos = () => {
  useEffect(() => {
    document.title = "Yanhub - Shows";
  }, []);

  const { openCreateVideoModal, setOpenCreateVideoModal } = useGlobalContext();
  return (
    <main className="videos-main grid-body">
      <Nav />
      <section className="body">
        <Greet />
        <div className="createVideoBtn">
          <button onClick={() => setOpenCreateVideoModal(true)}>
            New show &nbsp;
            <FaPlusCircle />
          </button>
        </div>
        <div className="videos">
          <div className="header">
            <h2>Shows</h2>
          </div>
          <div className="videos-container">
            {shows.map((shws, index) => {
              return <SingleShow key={index} shws={shws} />;
            })}
          </div>
        </div>
      </section>
      <LeaderboardNav />
      <CreateShowForm open={openCreateVideoModal} />
      <Bell />
    </main>
  );
};

export default Videos;
