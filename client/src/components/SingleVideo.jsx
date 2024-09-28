import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { format } from "date-fns";

import { useGlobalContext } from "../Context";

const SingleVideo = ({ vid }) => {
  const { getVidDetails, setVideoOptions } = useGlobalContext();

  const navigate = useNavigate();

  const set = (id) => {
    navigate(`/video/tasks/${id}`);
    getVidDetails(id);
  };

  const openOptions = () => {
    setVideoOptions(true);
    getVidDetails(vid._id);
  };

  const hrs = vid.duration.split(":")[0];
  const mins = vid.duration.split(":")[1];
  return (
    <div className="video">
      <div
        className="img"
        style={{
          backgroundImage: `url(/imgs/background/${"white1.jpg"})`,
        }}
        onClick={() => set(vid._id)}
      ></div>
      <div className="details">
        <div className="header">
          <strong
            onClick={() => set(vid._id)}
          >{`${vid.show.show}(${vid.ep})`}</strong>
          <div style={{ display: "flex", alignItems: "center" }}>
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
            </span>
            &nbsp;&nbsp;
            <FaEllipsisV onClick={openOptions} />
          </div>
        </div>
        <div className="info">
          <span className="dur">{`${hrs}h ${mins}m`}</span> {" . "}
          <span className="date">{format(vid.createdAt, "PP")}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleVideo;
