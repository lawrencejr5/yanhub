import React from "react";

import { useGlobalContext } from "../Context";

import { shows } from "../data/videos";

const SingleVideo = ({ vid, curr }) => {
  const { setVideoDetailsModal, setVidDetailsId } = useGlobalContext();

  const findShow = shows.find((show) => show.show === curr);

  const set = () => {
    setVideoDetailsModal(true);
    setVidDetailsId(vid.id);
  };
  return (
    <div className="video" onClick={() => set()}>
      <div
        className="img"
        style={{
          backgroundImage: `url(/imgs/background/${findShow.img})`,
        }}
      ></div>
      <div className="details">
        <strong>{`${vid.show}(${vid.ep})`}</strong>
        <div className="info">
          <span className="dur">{vid.dur}</span> {" . "}
          <span
            className={
              vid.status === "done"
                ? "status success"
                : vid.status === "editing"
                ? "status warning"
                : "status danger"
            }
          >
            {vid.status}
          </span>{" "}
          {" . "}
          <span className="date">{vid.datetime}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleVideo;
