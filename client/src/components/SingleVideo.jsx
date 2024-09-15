import React from "react";

import { useGlobalContext } from "../Context";

const SingleVideo = ({ vid }) => {
  const { setVideoDetailsModal, getVidDetails } = useGlobalContext();

  const set = async () => {
    await getVidDetails(vid._id);
    setVideoDetailsModal(true);
  };

  return (
    <div className="video" onClick={set}>
      <div
        className="img"
        style={{
          backgroundImage: `url(/imgs/background/${"white1.jpg"})`,
        }}
      ></div>
      <div className="details">
        <div className="header">
          <strong>{`${vid.showName}(${vid.ep})`}</strong>
          <span
            className={
              vid.status === "completed"
                ? "status success"
                : vid.status === "ongoing"
                ? "status warning"
                : "status danger"
            }
          >
            {vid.status}
          </span>{" "}
        </div>
        <div className="info">
          <span className="dur">{vid.duration}</span> {" . "}
          <span className="date">{vid.createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleVideo;
