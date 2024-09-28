import React from "react";
import { FaRegCheckCircle, FaCheckCircle, FaEllipsisH } from "react-icons/fa";
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
    fetchTask,
    fetchTasksByPage,
    limit,
    page,
    setTaskOptions,
  } = useGlobalContext();

  const clickFunc = (user) => {
    setUserModal(true);
    const usr = allUsers.find((u) => u._id === user);
    setCurrUser(usr);
  };

  const openTaskOptions = () => {
    setTaskOptions(true);
    fetchTask(task._id);
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

  const hrs = duration.split(":")[0];
  const mins = duration.split(":")[1];

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
      </div>
      <strong>{`${show}(${ep})`}</strong>
      <div className="info">
        <span>{`${hrs}h ${mins}m`}</span> . <span>{type}</span>
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
          <div>
            <button className="text-success">
              {status !== "completed" ? (
                <FaRegCheckCircle onClick={() => complete(id, type, vidId)} />
              ) : (
                <FaCheckCircle />
              )}
            </button>
            &nbsp;&nbsp;&nbsp;
            <FaEllipsisH onClick={openTaskOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskBox;
