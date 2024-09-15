import React from "react";
import { FaRegCheckCircle, FaCheckCircle } from "react-icons/fa";
import axios from "axios";

import { useGlobalContext } from "../Context";

const TaskBox = ({ task, hideUsers }) => {
  const {
    allUsers,
    setCurrUser,
    setUserModal,
    endpoint,
    token,
    setLoading,
    fetchTasks,
  } = useGlobalContext();

  const clickFunc = (user) => {
    setUserModal(true);
    const usr = allUsers.find((u) => u._id === user);
    setCurrUser(usr);
  };

  const complete = async (id, type, vidId) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${endpoint}/tasks/${id}?complete=true`,
        { status: "completed", type, vidId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchTasks();
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
    show,
    vidId,
    ep,
    type,
    status,
    duration,
    createdAt,
    assignedTo,
  } = task;
  return (
    <div className="task-box">
      <div className="header">
        <small>{createdAt}</small>
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
          {assignedTo.map((usr, i) => {
            const getUser = allUsers.find((user) => usr === user._id);
            if (hideUsers === true) return "";
            return (
              <img
                src={`/imgs/user-icons/${getUser.pic}`}
                alt=""
                key={i}
                onClick={() => clickFunc(getUser._id)}
              />
            );
          })}
        </div>
        <button className="text-success">
          {status !== "completed" ? (
            <FaRegCheckCircle onClick={() => complete(id, type, vidId)} />
          ) : (
            <FaCheckCircle />
          )}
        </button>
      </div>
    </div>
  );
};

export default TaskBox;
