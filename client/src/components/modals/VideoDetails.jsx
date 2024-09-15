import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

import { useGlobalContext } from "../../Context";

import { shows, videos } from "../../data/videos";

const VideoDetails = ({ open, show }) => {
  const navigate = useNavigate();

  const { setVideoDetailsModal, currVid } = useGlobalContext();

  const func = () => {
    navigate(`/shows/tasks/${currVid._id}`);
    setVideoDetailsModal(false);
  };
  return (
    <div
      className={
        open ? `vid-details-container open` : `vid-details-container close`
      }
    >
      <div className="vid-details-modal">
        <div className="header">
          <h3>Video details</h3>
          <FaChevronDown
            style={{ cursor: "pointer" }}
            onClick={() => setVideoDetailsModal(false)}
          />
        </div>
        <div
          className="banner"
          style={{ backgroundImage: `url(/imgs/background/${"white1.jpg"})` }}
        ></div>
        <div className="details">
          <div className="details-container">
            <strong>Show: </strong>
            <span>{show}</span>
          </div>
          <div className="details-container">
            <strong>Episode: </strong>
            <span>{currVid.ep}</span>
          </div>
          <div className="details-container">
            <strong>Status: </strong>
            <span>{currVid.status}</span>
          </div>
          {/* <div className="details-container">
            <strong>No. of users on it: </strong>
            <span>{currVid.users}</span>
          </div> */}
          <div className="details-container">
            <strong>Duration: </strong>
            <span>{currVid.duration}</span>
          </div>
          {/* <div className="details-container">
            <strong>Date Created: </strong>
            <span>{datetime}</span>
          </div> */}
        </div>
        <div className="btn-holder">
          <button className="danger" onClick={() => func()}>
            Assign Tasks
          </button>{" "}
          {/* &nbsp;
          <button className="success" onClick={() => func()}>
            Mark as completed
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
