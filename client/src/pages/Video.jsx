import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";

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

const Video = () => {
  const {
    endpoint,
    token,
    notification,
    loading,
    setLoading,
    videoDetailsModal,
    openCreateVideoModal,
    setOpenCreateVideoModal,
    getShowById,
    currShow,
  } = useGlobalContext();

  const { id: showId } = useParams();

  useEffect(() => {
    document.title = "Yanhub - Videos";
    getShowById(showId);
    getVideos();
  }, []);

  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${endpoint}/videos?show=${showId}&simplified=true`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoading(false);
      setVideos(data.simpVideos);
    } catch (err) {
      console.log(err);
    }
  };

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
            <div className="select">
              <select name="" id="select">
                <option value="all">Sort...</option>
                <option value="completed">Completed</option>
                <option value="editing">Ongoing</option>
                <option value="undone">Undone</option>
              </select>
            </div>
            {videos.map((vid, index) => {
              return <SingleVideo vid={vid} curr={showId} key={index} />;
            })}
          </div>
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
      <VideoDetails open={videoDetailsModal} show={currShow.show} />
    </main>
  );
};

export default Video;
