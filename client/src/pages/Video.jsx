import React, { useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import { useGlobalContext } from "../Context";

import { videos, shows } from "../data/videos";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Back from "../components/Back";
import SingleVideo from "../components/SingleVideo";
import VideoDetails from "../components/VideoDetails";

const Video = () => {
  const { videoDetailsModal } = useGlobalContext();
  const { pathname } = useLocation();
  const curr = pathname.split("/")[2].replaceAll("%20", " ");

  useEffect(() => {
    document.title = "Yanhub - Videos";
  }, []);

  const findShow = shows.find((show) => show.show === curr);
  const vids = videos.filter((vid) => vid.show === curr);

  return (
    <main className="video-main grid-body">
      <Nav />
      <section className="body">
        <Back text={"Gbam video"} />
        <div className="createVideoBtn">
          <button>
            New Video &nbsp;
            <FaPlusCircle />
          </button>
        </div>
        <div className="videos">
          <div className="header">
            <div
              className="banner"
              style={{
                backgroundImage: `url(/imgs/background/${findShow.img})`,
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
            {vids.map((vid, index) => {
              return <SingleVideo vid={vid} curr={curr} key={index} />;
            })}
          </div>
        </div>
      </section>
      <LeaderboardNav />
      <Bell />
      <VideoDetails open={videoDetailsModal} curr={curr} />
    </main>
  );
};

export default Video;
