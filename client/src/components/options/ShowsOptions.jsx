import React, { useState } from "react";
import {
  FaChevronDown,
  FaTrash,
  FaRegCheckCircle,
  FaTimes,
} from "react-icons/fa";

import { useGlobalContext } from "../../Context";

const ShowsOptions = () => {
  const { showOptions, setShowOptions } = useGlobalContext();

  const [del, setDel] = useState(false);

  return (
    <div className={`options-container ${showOptions ? "blur" : ""}`}>
      <div className={`options ${showOptions ? "up" : ""}`}>
        <div className="header">
          <h3>Options</h3>
          <FaChevronDown onClick={() => setShowOptions(false)} />
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

        <div className={`del-sec ${del ? "hide" : ""}`}>
          <h4>Delete show</h4>
          <button className="danger" onClick={() => setDel(true)}>
            <FaTrash />
          </button>
        </div>
        <div className={`del-sec ${del ? "" : "hide"}`}>
          <small className="text-danger">
            Note that this action is irreversible and every task and video
            associated with this show will be wiped out
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

export default ShowsOptions;
