import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaChevronDown,
  FaTrash,
  FaRegCheckCircle,
  FaTimes,
} from "react-icons/fa";
import { useGlobalContext } from "../../Context";

const TasksOptions = () => {
  const [del, setDel] = useState(false);

  const {
    taskOptions,
    setTaskOptions,
    fetchTasks,
    fetchTasksByPage,
    limit,
    page,
    currTask,
    endpoint,
    token,
    setNotification,
  } = useGlobalContext();

  const [started, setStarted] = useState(currTask.started);
  const [ended, setEnded] = useState(currTask.ended);
  const [status, setStatus] = useState(currTask.status);

  const newStarted = !currTask.started ? "" : currTask.started.split("T")[0];
  const newEnded = !currTask.ended ? "" : currTask.ended.split("T")[0];
  useEffect(() => {
    setStarted(newStarted);
    setEnded(newEnded);
    setStatus(currTask.status);
  }, [currTask]);

  const delTask = async () => {
    try {
      const { data } = await axios.delete(`${endpoint}/tasks/${currTask._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTaskOptions(false);
      fetchTasks();
      fetchTasksByPage(limit, page);
      setNotification({ text: data.msg, theme: "success", status: true });
      console.log(data);
    } catch (err) {
      const {
        response: { data },
      } = err;
      setNotification({ text: data.msg, theme: "danger", status: true });
      console.log(data);
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `${endpoint}/tasks/${currTask._id}`,
        { started, ended },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTaskOptions(false);
      setNotification({ text: data.msg, theme: "success", status: true });
      fetchTasks();
      fetchTasksByPage(limit, page);
      console.log(data);
    } catch (err) {
      const {
        response: { data },
      } = err;
      setNotification({ text: data.msg, theme: "danger", status: true });
      console.log(data);
    }
  };

  const updateStat = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `${endpoint}/tasks/${currTask._id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTaskOptions(false);
      setNotification({ text: data.msg, theme: "success", status: true });
      fetchTasks();
      fetchTasksByPage(limit, page);
    } catch (err) {
      const {
        response: { data },
      } = err;
      setNotification({ text: data.msg, theme: "danger", status: true });
      console.log(data);
    }
  };

  return (
    <div className={`options-container ${taskOptions ? "blur" : ""}`}>
      <div className={`options ${taskOptions ? "up" : ""}`}>
        <div className="header">
          <h3>Options</h3>
          <FaChevronDown onClick={() => setTaskOptions(false)} />
        </div>
        {currTask.length == 0 ? (
          ""
        ) : (
          <div>
            <br />
            <span>{currTask.video.show.show} . </span>
            <span>{currTask.video.ep} . </span>
            <span>{currTask.type} </span>
          </div>
        )}
        <form action="" className="edit-sec" onSubmit={updateStat}>
          <div className="inp-holder">
            <strong htmlFor="">Mark as: </strong>
            <select
              name=""
              id=""
              value={status}
              defaultValue={currTask.status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="undone">undone</option>
              <option value="ongoing">ongoing</option>
              <option value="completed">completed</option>
            </select>
          </div>
          <button className="success">
            update&nbsp;
            <FaRegCheckCircle />
          </button>
        </form>
        <form action="" className="edit-sec from-to" onSubmit={updateTask}>
          <div className="inp-holder">
            <label htmlFor="">From:</label>
            <input
              type="date"
              value={started}
              onChange={(e) => setStarted(e.target.value)}
            />
          </div>
          <div className="inp-holder">
            <label htmlFor="">To:</label>
            <input
              type="date"
              value={ended}
              onChange={(e) => setEnded(e.target.value)}
            />
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
          <h4>Delete Task</h4>
          <button className="danger" onClick={() => setDel(true)}>
            <FaTrash />
          </button>
        </div>
        <div className={`del-sec ${del ? "" : "hide"}`}>
          <small className="text-danger">
            Note that this action is irreversible, this task will be deleted
          </small>
          <button className="secondary" onClick={() => setDel(false)}>
            No
            <FaTimes />
          </button>
          &nbsp;
          <button className="danger" onClick={delTask}>
            Yes
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TasksOptions;
