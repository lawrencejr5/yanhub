import React, { useState } from "react";
import {
  FaChevronDown,
  FaTrash,
  FaRegCheckCircle,
  FaTimes,
} from "react-icons/fa";

import { useGlobalContext } from "../../Context";

const VidOptions = () => {
  const { videoOptions, setVideoOptions } = useGlobalContext();

  const [del, setDel] = useState(false);

  return (
    <div className={`options-container ${videoOptions ? "blur" : ""}`}>
      <div className={`options ${videoOptions ? "up" : ""}`}>
        <div className="header">
          <h3>Options</h3>
          <FaChevronDown onClick={() => setVideoOptions(false)} />
        </div>
        <form action="" className="edit-sec">
          <div className="inp-holder">
            <input type="text" />
          </div>
          <button className="success">
            update&nbsp;
            <FaRegCheckCircle />
          </button>
        </form>
        <form action="" className="edit-sec dur">
          <div className="inp-holder">
            <input type="number" />
            <label htmlFor="">hr(s)</label>
          </div>
          <div className="inp-holder">
            <input type="number" />
            <label htmlFor="">min(s)</label>
          </div>
          <button className="success">
            set&nbsp;
            <FaRegCheckCircle />
          </button>
        </form>

        <div className={`del-sec ${del ? "hide" : ""}`}>
          <h4>Delete Video</h4>
          <button className="danger" onClick={() => setDel(true)}>
            <FaTrash />
          </button>
        </div>
        <div className={`del-sec ${del ? "" : "hide"}`}>
          <small className="text-danger">
            Note that this action is irreversible and every task associated with
            this video will be wiped out
          </small>
          <button className="secondary" onClick={() => setDel(false)}>
            No
            <FaTimes />
          </button>
          &nbsp;
          <button className="danger">
            Yes
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VidOptions;
