import React from "react";
import { FaRegCheckCircle, FaCheckCircle } from "react-icons/fa";

const TaskBox = ({ task }) => {
  const { show, ep, type, status, duration, date } = task;
  return (
    <div className="task-box">
      <div className="header">
        <small>{date}</small>
        <small
          id="status"
          className={
            status === "completed"
              ? "success"
              : status === "ongoing"
              ? "warning"
              : "danger"
          }
        >
          {status}
        </small>
      </div>
      <strong>{`${show}(${ep})`}</strong>
      <div className="info">
        <span>{duration}</span> . <span>{type}</span>
      </div>
      <div className="bottom">
        <div className="users">
          {/* {usrs.map((usr, i) => {
            const getUser = users.find((user) => usr === user.username);
            return (
              <img
                src={`/imgs/user/${getUser.pic}`}
                alt=""
                key={i}
                onClick={() => clickFunc(getUser.username)}
              />
            );
          })} */}
        </div>
        <button className="text-success">
          <FaRegCheckCircle />
        </button>
      </div>
    </div>
  );
};

export default TaskBox;
