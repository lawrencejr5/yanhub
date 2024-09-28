import React, { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaTrash,
  FaRegCheckCircle,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";

import { useGlobalContext } from "../../Context";

const ShowsOptions = () => {
  const { showOptions, setShowOptions, currShow, token, endpoint, fetchShows } =
    useGlobalContext();

  const [del, setDel] = useState(false);

  const [show, setShow] = useState(currShow.show);
  const [showId, setShowId] = useState(currShow._id);

  useEffect(() => {
    setShow(currShow.show);
    setShowId(currShow._id);
  }, [currShow]);

  const updateShow = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `${endpoint}/shows/${showId}`,
        { show },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(data.msg);
      fetchShows();
      setShowOptions(false);
    } catch (err) {
      const {
        response: { data },
      } = err;
      console.log(data);
    }
  };

  const delShow = async () => {
    try {
      const { data } = await axios.delete(`${endpoint}/shows/${showId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data.msg);
      fetchShows();
      setShowOptions(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`options-container ${showOptions ? "blur" : ""}`}>
      <div className={`options ${showOptions ? "up" : ""}`}>
        <div className="header">
          <h3>Options</h3>
          <FaChevronDown onClick={() => setShowOptions(false)} />
        </div>
        <form action="" className="edit-sec" onSubmit={updateShow}>
          <div className="inp-holder">
            <input
              type="text"
              value={show}
              onChange={(e) => setShow(e.target.value)}
            />
          </div>
          <button className="success">
            update&nbsp;
            <FaRegCheckCircle />
          </button>
        </form>

        <div className={`del-sec ${del ? "hide" : ""}`}>
          <h4>Delete show</h4>
          <button className="danger" onClick={() => setDel(true)}>
            <FaTrash />
          </button>
        </div>
        <div className={`del-sec ${del ? "" : "hide"}`}>
          <small className="text-danger">
            Note that this action is irreversible and every task and video
            associated with this show will be wiped out
          </small>
          <button className="secondary" onClick={() => setDel(false)}>
            No
            <FaTimes />
          </button>
          &nbsp;
          <button className="danger" onClick={delShow}>
            Yes
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowsOptions;
