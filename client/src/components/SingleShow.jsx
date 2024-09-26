import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";

import { useGlobalContext } from "../Context";

const SingleShow = ({ shws }) => {
  const { _id: id, show, bgImg, rowCount } = shws;

  const { setShowOptions } = useGlobalContext();

  const navigate = useNavigate();
  const setVid = async () => {
    navigate(`/videos/${id}`);
  };

  return (
    <div className="video">
      <div className="vid-icon">
        <img src={`/imgs/icons/${bgImg}`} alt="" onClick={setVid} />
      </div>
      <div className="vid-details">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong onClick={setVid}>{`${show}`}</strong>
          <FaEllipsisV onClick={() => setShowOptions(true)} />
        </div>
        <small>{rowCount} Videos</small>
      </div>
    </div>
  );
};

export default SingleShow;
