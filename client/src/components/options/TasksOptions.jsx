import React, { useState } from "react";
import {
  FaChevronDown,
  FaTrash,
  FaRegCheckCircle,
  FaTimes,
} from "react-icons/fa";
import { useGlobalContext } from "../../Context";

const TasksOptions = () => {
  const [del, setDel] = useState(false);

  const { taskOptions, setTaskOptions } = useGlobalContext();
  return (
    <div className={`options-container ${taskOptions ? "blur" : ""}`}>
      <div className={`options ${taskOptions ? "up" : ""}`}>
        <div className="header">
          <h3>Options</h3>
          <FaChevronDown onClick={() => setTaskOptions(false)} />
        </div>
        <form action="" className="edit-sec from-to">
          <div className="inp-holder">
            <label htmlFor="">From:</label>
            <input type="date" />
          </div>
          <div className="inp-holder">
            <label htmlFor="">To:</label>
            <input type="date" />
          </div>
          <br />
          <div className="btn-holder">
            <button className="success">
              set&nbsp;
              <FaRegCheckCircle />
            </button>
          </div>
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

export default TasksOptions;
