import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";

import { useGlobalContext } from "../Context";

const SingleShow = ({ shws }) => {
  const { _id: id, show, bgImg, rowCount } = shws;

  const navigate = useNavigate();
  const setVid = async () => {
    navigate(`/videos/${id}`);
  };

  return (
    <div className="video" onClick={() => setVid()}>
      <div className="vid-icon">
        <img src={`/imgs/icons/${bgImg}`} alt="" />
      </div>
      <div className="vid-details">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>{`${show}`}</strong>
          <FaEllipsisV />
        </div>
        <small>{rowCount} Videos</small>
      </div>
    </div>
  );
};

export default SingleShow;
