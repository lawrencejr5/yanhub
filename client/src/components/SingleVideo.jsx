import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

import { useGlobalContext } from "../Context";

const SingleVideo = ({ vid }) => {
  const { getVidDetails } = useGlobalContext();

  const navigate = useNavigate();

  const set = (id) => {
    navigate(`/video/tasks/${id}`);
    getVidDetails(id);
  };

  return (
    <div className="video" onClick={() => set(vid._id)}>
      <div
        className="img"
        style={{
          backgroundImage: `url(/imgs/background/${"white1.jpg"})`,
        }}
      ></div>
      <div className="details">
        <div className="header">
          <strong>{`${vid.show.show}(${vid.ep})`}</strong>
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
          <span className="date">{format(vid.createdAt, "PP")}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleVideo;
