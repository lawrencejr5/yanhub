import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SingleVideo = ({ vid }) => {
  const navigate = useNavigate();

  const set = (id) => {
    navigate(`/video/tasks/${id}`);
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
