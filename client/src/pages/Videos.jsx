import React, { useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";

import { useGlobalContext } from "../Context";

import { videos } from "../data/videos";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
import CreateVideoForm from "../components/CreateVideoForm";
import SingleVideo from "../components/SingleVideo";
import VideoDetails from "../components/VideoDetails";

const Videos = () => {
  const { openCreateVideoModal, setOpenCreateVideoModal, videoDetailsModal } =
    useGlobalContext();
  useEffect(() => {
    document.title = "Yanhub - Videos";
  }, []);
  return (
    <main className="video-main grid-body">
      <Nav />
      <section className="body">
        <Greet />
        <div className="createVideoBtn">
          <button onClick={() => setOpenCreateVideoModal(true)}>
            New Video &nbsp;
            <FaPlusCircle />
          </button>
        </div>
        <div className="videos">
          <div className="header">
            <h2>Videos</h2>
            <select name="" id="">
              <option value="">Sort...</option>
              <option value="">Completed</option>
              <option value="">Ongoing</option>
              <option value="">Undone</option>
            </select>
          </div>
          <div className="videos-container">
            {videos.map((vid, index) => {
              return <SingleVideo key={index} vid={vid} />;
            })}
          </div>
        </div>
      </section>
      <LeaderboardNav />
      <VideoDetails open={videoDetailsModal} />
      <CreateVideoForm open={openCreateVideoModal} />
      <Bell />
    </main>
  );
};

export default Videos;
