import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

import { useGlobalContext } from "../../Context";

const CreateShowForm = ({ open, getShows }) => {
  const {
    endpoint,
    token,
    btnLoad,
    setBtnLoad,
    setNotification,
    setOpenCreateVideoModal,
  } = useGlobalContext();

  const [show, setShow] = useState("");

  const createShow = async (e) => {
    e.preventDefault();

    try {
      setBtnLoad(true);
      const { data } = await axios.post(
        `${endpoint}/shows`,
        { show },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBtnLoad(false);
      setShow("");
      getShows();
      setNotification({ text: data.msg, status: true, theme: "success" });
      setOpenCreateVideoModal(false);
    } catch (err) {
      const {
        response: { data },
      } = err;
      setBtnLoad(false);
      setNotification({ text: data.msg, status: true, theme: "danger" });
      setOpenCreateVideoModal(false);
    }
  };
  return (
    <div
      className={
        open
          ? "create-video-container"
          : "create-video-container create-video-container-hide"
      }
    >
      <form action="" onSubmit={createShow}>
        <div className="header">
          <h2>New Show</h2>
          <FaTimes
            className="icon"
            onClick={() => setOpenCreateVideoModal(false)}
          />
        </div>
        <div className="inp-handler">
          <div className="inp-holder">
            <input type="file" name="" id="" />
          </div>
          <div className="inp-holder">
            <input
              type=""
              name=""
              id=""
              value={show}
              onChange={(e) => setShow(e.target.value)}
              placeholder="Show..."
            />
          </div>
        </div>
        <div className="btn-handler">
          <button>{btnLoad ? "Creating..." : "Create Show"}</button>
        </div>
      </form>
    </div>
  );
};

export default CreateShowForm;
