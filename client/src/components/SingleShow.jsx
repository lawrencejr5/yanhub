import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";

import { useGlobalContext } from "../Context";

const SingleShow = ({ shws }) => {
  const { _id: id, show, bgImg, rowCount } = shws;

  const { setShowOptions, getShowById, isAdmin } = useGlobalContext();

  const navigate = useNavigate();
  const setCurr = () => {
    getShowById(id);
    setShowOptions(true);
  };

  return (
    <div className="video">
      <div className="vid-icon">
        <img
          src={`/imgs/icons/${bgImg}`}
          alt=""
          onClick={() => navigate(`/videos/${id}`)}
        />
      </div>
      <div className="vid-details">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong onClick={() => navigate(`/videos/${id}`)}>{`${show}`}</strong>
          {isAdmin && <FaEllipsisV onClick={setCurr} />}
        </div>
        <small>{rowCount} Videos</small>
      </div>
    </div>
  );
};

export default SingleShow;
