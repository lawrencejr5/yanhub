import React from "react";
import { FaChevronDown } from "react-icons/fa";

import { useGlobalContext } from "../Context";

import { videos } from "../data/videos";

const VideoDetails = ({ open }) => {
  const { setVideoDetailsModal, vidDetailsId } = useGlobalContext();
  const singleVid = videos.find((vid) => vid.id === vidDetailsId);
  const { show, ep, dur, users, status } = singleVid;
  return (
    <div className={open ? "vid-details-modal" : "vid-details-modal hide-down"}>
      <div className="header">
        <h3>Video details</h3>
        <FaChevronDown
          className="icon"
          onClick={() => setVideoDetailsModal(false)}
        />
      </div>
      <div className="details">
        <div className="details-container">
          <strong>Show: </strong>
          <span>{show}</span>
        </div>
        <div className="details-container">
          <strong>Episode: </strong>
          <span>{ep}</span>
        </div>
        <div className="details-container">
          <strong>Status: </strong>
          <span>{status}</span>
        </div>
        <div className="details-container">
          <strong>No. of users on it: </strong>
          <span>{users}</span>
        </div>
        <div className="details-container">
          <strong>Duration: </strong>
          <span>{dur}</span>
        </div>
      </div>
      <button>Show Tasks</button>
    </div>
  );
};

export default VideoDetails;
