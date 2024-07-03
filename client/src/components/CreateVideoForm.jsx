import React from "react";
import { FaTimes } from "react-icons/fa";

import { useGlobalContext } from "../Context";

const CreateVideoForm = ({ open }) => {
  const { setOpenCreateVideoModal } = useGlobalContext();
  return (
    <div
      className={
        open ? "create-video-container" : "create-video-container hide"
      }
    >
      <form action="">
        <div className="header">
          <h2>New Video</h2>
          <FaTimes
            className="icon"
            onClick={() => setOpenCreateVideoModal(false)}
          />
        </div>
        <div className="inp-handler">
          <div className="inp-holder">
            <select name="" id="">
              <option value="">Show...</option>
              <option value="">Gbam</option>
              <option value="">Obiagelli Studios</option>
              <option value="">O set eh</option>
              <option value="">Oku na Uka</option>
              <option value="">Oku di Over</option>
              <option value="">Umu Ada</option>
            </select>
          </div>
          <div className="inp-holder">
            <input type="" name="" id="" placeholder="Episode..." />
          </div>
          <div className="inp-holder">
            <input type="text" name="" id="" placeholder="Duration..." />
          </div>
        </div>
        <div className="btn-handler">
          <button>Create Task</button>
        </div>
      </form>
    </div>
  );
};

export default CreateVideoForm;
