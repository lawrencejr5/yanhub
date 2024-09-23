import React from "react";
import { FaRegCheckCircle, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import axios from "axios";
import { format } from "date-fns";

import { useGlobalContext } from "../Context";

const TaskBox = ({ task, hideUsers }) => {
  const {
    allUsers,
    setCurrUser,
    setUserModal,
    isAdmin,
    endpoint,
    token,
    setLoading,
    fetchTasks,
    fetchTasksByPage,
    limit,
    page,
  } = useGlobalContext();

  const clickFunc = (user) => {
    setUserModal(true);
    const usr = allUsers.find((u) => u._id === user);
    setCurrUser(usr);
  };

  const complete = async (id, type, video) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${endpoint}/tasks/${id}?complete=true`,
        { status: "completed", type, video },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchTasks();
      await fetchTasksByPage(limit, page);
      setLoading(false);
    } catch (err) {
      const {
        response: { data },
      } = err;
      console.log(data);
    }
  };
  const {
    _id: id,
    video: {
      _id: vidId,
      ep,
      duration,
      show: { show },
    },
    type,
    status,
    createdAt,
    assignedTo,
  } = task;

  const dateTime = format(createdAt, "PPpp");
  return (
    <div className="task-box">
      <div className="header">
        <small>{dateTime}</small>
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
        {/* <FaEllipsisV /> */}
      </div>
      <strong>{`${show}(${ep})`}</strong>
      <div className="info">
        <span>{duration}</span> . <span>{type}</span>
      </div>
      <div className="bottom">
        <div className="users">
          {assignedTo.map((usr, i) => {
            if (hideUsers === true) return "";
            return (
              <img
                src={`/imgs/user-icons/${usr.pic}`}
                alt=""
                key={i}
                onClick={() => clickFunc(usr._id)}
              />
            );
          })}
        </div>
        {!isAdmin ? (
          ""
        ) : (
          <button className="text-success">
            {status !== "completed" ? (
              <FaRegCheckCircle onClick={() => complete(id, type, vidId)} />
            ) : (
              <FaCheckCircle />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskBox;
