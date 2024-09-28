import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";

import { useGlobalContext } from "../Context";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Back from "../components/Back";
import SingleVideo from "../components/SingleVideo";
import VideoDetails from "../components/modals/VideoDetails";
import CreateVideoForm from "../components/modals/CreateVideoForm";
import Loading from "../components/Loading";
import Notification from "../components/Notification";
import SortNav from "../components/SortNav";
import VidOptions from "../components/options/VidOptions";

const Video = () => {
  const {
    notification,
    loading,
    getVideos,
    videos,
    openCreateVideoModal,
    setOpenCreateVideoModal,
    getShowById,
    currShow,
  } = useGlobalContext();

  const { id: showId } = useParams();

  const [sortVal, setSortVal] = useState("");

  useEffect(() => {
    document.title = "Yanhub - Videos";
    getShowById(showId);
    getVideos(showId);
  }, []);

  useEffect(() => {
    getVideos(showId, sortVal);
  }, [sortVal]);

  if (loading) return <Loading />;
  return (
    <main className="video-main grid-body">
      <Nav />
      <section className="body">
        <Back text={`${currShow.show} videos`} />
        <Notification notification={notification} />
        <div className="createVideoBtn">
          <button onClick={() => setOpenCreateVideoModal(true)}>
            New Video &nbsp;
            <FaPlusCircle />
          </button>
        </div>
        <div className="videos">
          <div className="header">
            <div
              className="banner"
              style={{
                backgroundImage: `url(/imgs/background/${"white1.jpg"})`,
              }}
            ></div>
          </div>
          <div className="videos-container">
            <SortNav sortVal={sortVal} setSortVal={setSortVal} />
            {videos.map((vid, index) => {
              return <SingleVideo vid={vid} curr={showId} key={index} />;
            })}
          </div>
          <br />
          <br />
          <br />
        </div>
      </section>
      <LeaderboardNav />
      <CreateVideoForm
        open={openCreateVideoModal}
        getVideos={getVideos}
        showId={showId}
        currShow={currShow}
      />
      <Bell />
      <VidOptions />
    </main>
  );
};

export default Video;
