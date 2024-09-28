import React, { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaTrash,
  FaRegCheckCircle,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";

import { useGlobalContext } from "../../Context";

const VidOptions = () => {
  const {
    videoOptions,
    setVideoOptions,
    getVideos,
    currVid,
    endpoint,
    token,
    setNotification,
  } = useGlobalContext();

  const [del, setDel] = useState(false);

  const [ep, setEp] = useState(currVid.ep);
  const [status, setStatus] = useState(currVid.status);
  const [hrs, setHrs] = useState(0);
  const [mins, setMins] = useState(0);

  const hours = !currVid.duration ? "" : currVid.duration.split(":")[0];
  const minutes = !currVid.duration ? "" : currVid.duration.split(":")[1];

  useEffect(() => {
    setEp(currVid.ep);
    setStatus(currVid.status);
    setHrs(hours);
    setMins(minutes);
  }, [currVid]);

  const updateEp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `${endpoint}/videos/${currVid._id}`,
        { ep },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVideoOptions(false);
      setNotification({ text: data.msg, theme: "success", status: true });
      getVideos(currVid.show._id);
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
        `${endpoint}/videos/${currVid._id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVideoOptions(false);
      setNotification({ text: data.msg, theme: "success", status: true });
      getVideos(currVid.show._id);
    } catch (err) {
      const {
        response: { data },
      } = err;
      setNotification({ text: data.msg, theme: "danger", status: true });
      console.log(data);
    }
  };
  const updateDur = async (e) => {
    e.preventDefault();
    try {
      const duration = `${hrs}:${mins}`;
      const { data } = await axios.patch(
        `${endpoint}/videos/${currVid._id}`,
        { duration },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotification({ text: data.msg, theme: "success", status: true });
      setVideoOptions(false);
      getVideos(currVid.show._id);
    } catch (err) {
      const {
        response: { data },
      } = err;
      setNotification({ text: data.msg, theme: "danger", status: true });
      console.log(data);
    }
  };
  const delVideo = async () => {
    try {
      const { data } = await axios.delete(`${endpoint}/videos/${currVid._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideoOptions(false);
      setNotification({ text: data.msg, theme: "success", status: true });
      getVideos(currVid.show._id);
      console.log(data);
    } catch (err) {
      const {
        response: { data },
      } = err;
      setNotification({ text: data.msg, theme: "danger", status: true });
      console.log(data);
    }
  };

  return (
    <div className={`options-container ${videoOptions ? "blur" : ""}`}>
      <div className={`options ${videoOptions ? "up" : ""}`}>
        <div className="header">
          <h3>Options</h3>
          <FaChevronDown onClick={() => setVideoOptions(false)} />
        </div>
        <form action="" className="edit-sec" onSubmit={updateEp}>
          <div className="inp-holder">
            <input
              type="text"
              value={ep}
              onChange={(e) => setEp(e.target.value)}
            />
          </div>
          <button className="success">
            update&nbsp;
            <FaRegCheckCircle />
          </button>
        </form>
        <form action="" className="edit-sec" onSubmit={updateStat}>
          <div className="inp-holder">
            <strong htmlFor="">Mark as: </strong>
            <select
              name=""
              id=""
              value={status}
              defaultValue={currVid.status}
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
        <form action="" className="edit-sec dur" onSubmit={updateDur}>
          <div className="inp-holder">
            <input
              type="number"
              value={hrs}
              onChange={(e) => setHrs(e.target.value)}
            />
            <label htmlFor="">hr(s)</label>
          </div>
          <div className="inp-holder">
            <input
              type="number"
              value={mins}
              onChange={(e) => setMins(e.target.value)}
            />
            <label htmlFor="">min(s)</label>
          </div>
          <button className="success">
            set&nbsp;
            <FaRegCheckCircle />
          </button>
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
          <button className="danger" onClick={delVideo}>
            Yes
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VidOptions;
