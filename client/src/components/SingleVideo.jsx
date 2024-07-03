import React from "react";

import { useGlobalContext } from "../Context";

const SingleVideo = ({ vid }) => {
  const { ep, show, status } = vid;
  const { setVideoDetailsModal } = useGlobalContext();

  return (
    <div className="video" onClick={() => setVideoDetailsModal(true)}>
      <div className="vid-icon">
        <img src="/imgs/icons/video-icon.jpg" alt="" />
      </div>
      <div className="vid-details">
        <strong>{`${show}(${ep})`}</strong>
        <small className="tag">{status}</small>
      </div>
    </div>
  );
};

export default SingleVideo;
