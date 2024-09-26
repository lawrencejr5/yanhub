import React from "react";
import {
  FaChevronDown,
  FaTrash,
  FaRegCheckCircle,
  FaTimes,
} from "react-icons/fa";

const TasksOptions = () => {
  return (
    <div className="options-container">
      <div className="options up">
        <div className="header">
          <h3>Options</h3>
          <FaChevronDown />
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

        <div className="del-sec">
          <h4>Delete task</h4>
          <button className="danger">
            <FaTrash />
          </button>
        </div>
        <div className="del-sec hide">
          <small className="text-danger">
            Note that this action is irreversible, are you sure you want to
            delete this task?
          </small>
          <button className="secondary">
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
