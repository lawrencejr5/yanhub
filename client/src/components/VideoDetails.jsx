import React from "react";
import { FaChevronDown } from "react-icons/fa";

import { useGlobalContext } from "../Context";

const VideoDetails = ({ open }) => {
  const { setVideoDetailsModal } = useGlobalContext();
  return (
    <div className={open ? "vid-details-modal" : "vid-details-modal hide-down"}>
      <div className="header">
        <h3>Video details</h3>
        <FaChevronDown
          className="icon"
          onClick={() => setVideoDetailsModal(false)}
        />
      </div>
      <div className="details">
        ahsbjasc cakscas lasnomca lanwscnamas lnasbubcans kanbsucba lknabsucbia
        lnsiucaois
      </div>
    </div>
  );
};

export default VideoDetails;
