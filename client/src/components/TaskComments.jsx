import React from "react";
import { FaChevronDown, FaPlane } from "react-icons/fa";

const TaskComments = () => {
  return (
    <div className="tasks-comments-container">
      <div className="tasks-comments">
        <div className="header">
          <h3>Comments</h3>
          <FaChevronDown />
        </div>
        <div className="chats">
          <div className="chat">
            <div className="title">
              <small>@dave . just now</small>
            </div>
            <p>Nice subtitle!</p>
          </div>
          <div className="chat">
            <div className="title">
              <small>@lawrencejr . just now</small>
            </div>
            <p>Cynthia, ur doing a nice job </p>
          </div>
        </div>
        {/* <div className="footer">
          <div className="inp-holder">
            <input type="text" name="" id="" />
            <button>
              <FaPlane />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TaskComments;
