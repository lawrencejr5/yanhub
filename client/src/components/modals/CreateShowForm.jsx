import React from "react";
import { FaTimes } from "react-icons/fa";

import { useGlobalContext } from "../../Context";

const CreateShowForm = ({ open }) => {
  const { setOpenCreateVideoModal } = useGlobalContext();
  return (
    <div
      className={
        open
          ? "create-video-container"
          : "create-video-container create-video-container-hide"
      }
    >
      <form action="">
        <div className="header">
          <h2>New Show</h2>
          <FaTimes
            className="icon"
            onClick={() => setOpenCreateVideoModal(false)}
          />
        </div>
        <div className="inp-handler">
          <div className="inp-holder">
            <input type="file" name="" id="" />
          </div>
          <div className="inp-holder">
            <input type="" name="" id="" placeholder="Show..." />
          </div>
        </div>
        <div className="btn-handler">
          <button>Create Show</button>
        </div>
      </form>
    </div>
  );
};

export default CreateShowForm;
