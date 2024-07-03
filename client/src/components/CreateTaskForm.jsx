import React from "react";
import { FaChevronDown } from "react-icons/fa";

import { useGlobalContext } from "../Context";
const CreateTaskForm = ({ open }) => {
  const { setOpenCreateTaskModal } = useGlobalContext();
  return (
    <div
      className={
        open ? "task-form-container task-form-open" : "task-form-container"
      }
    >
      <form action="">
        <div className="header">
          <h2>Create New Task</h2>
          <FaChevronDown
            className="icon"
            onClick={() => setOpenCreateTaskModal(false)}
          />
        </div>
        <div className="inp-handler">
          <div className="inp-holder">
            <input type="text" name="" id="" placeholder="Task Name..." />
          </div>
          <div className="inp-holder">
            <input type="text" name="" id="" placeholder="Client..." />
          </div>
          <div className="inp-holder">
            <input type="text" name="" id="" placeholder="Duration..." />
          </div>
          <div className="inp-holder">
            <select name="" id="">
              <option value="">Choose Task Type...</option>
              <option value="">Cutting & Sound</option>
              <option value="">Cutting</option>
              <option value="">Cutting & Subitling</option>
              <option value="">Setup</option>
              <option value="">Shooting</option>
              <option value="">Sound</option>
              <option value="">Subtitling</option>
            </select>
          </div>
          <div className="inp-holder">
            <select name="" id="">
              <option value="">Assign Task To...</option>
              <option value="">All</option>
              <option value="">Asher</option>
              <option value="">Dave</option>
              <option value="">Lawrencejr</option>
              <option value="">Vivian</option>
            </select>
          </div>
        </div>
        <div className="btn-handler">
          <button>Create Task</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskForm;
