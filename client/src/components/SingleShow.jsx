import React from "react";
import { useNavigate } from "react-router-dom";

const SingleShow = ({ shws }) => {
  const { show, bgImg } = shws;

  const navigate = useNavigate();
  const setVid = () => {
    navigate(`/videos/${show}`);
  };

  return (
    <div className="video" onClick={() => setVid()}>
      <div className="vid-icon">
        <img src={`/imgs/icons/${bgImg}`} alt="" />
      </div>
      <div className="vid-details">
        <strong>{`${show}`}</strong>
        <br />
        <small>{0} Videos</small>
      </div>
    </div>
  );
};

export default SingleShow;
