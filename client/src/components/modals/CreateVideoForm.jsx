import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

import { useGlobalContext } from "../../Context";

const CreateVideoForm = ({ open, showId, currShow }) => {
  const {
    endpoint,
    token,
    btnLoad,
    setBtnLoad,
    setNotification,
    setOpenCreateVideoModal,
    getVideos,
  } = useGlobalContext();

  const [ep, setEp] = useState("");
  const [show, setShow] = useState(currShow.show);

  const createVideo = async (e) => {
    e.preventDefault();

    try {
      setBtnLoad(true);
      const { data } = await axios.post(
        `${endpoint}/videos`,
        { showId, ep },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBtnLoad(false);
      setEp("");
      await getVideos(showId);
      setOpenCreateVideoModal(false);
      setNotification({ text: data.msg, theme: "success", status: true });
    } catch (err) {
      const {
        response: { data },
      } = err;
      setBtnLoad(false);
      setOpenCreateVideoModal(false);
      setNotification({ text: data.msg, theme: "danger", status: true });
      console.log(data);
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
      <form action="" onSubmit={createVideo}>
        <div className="header">
          <h2>New Video</h2>
          <FaTimes
            className="icon"
            onClick={() => setOpenCreateVideoModal(false)}
          />
        </div>
        <div className="inp-handler">
          <div className="inp-holder">
            <input
              type="text"
              value={show}
              onChange={(e) => {
                setShow(e.target.value);
              }}
              disabled
            />
          </div>
          <div className="inp-holder">
            <input
              type="text"
              name="ep"
              id=""
              value={ep}
              onChange={(e) => {
                setEp(e.target.value);
              }}
              placeholder="Episode..."
            />
          </div>
        </div>
        <div className="btn-handler">
          <button>{btnLoad ? `Creating...` : `Create video`}</button>
        </div>
      </form>
    </div>
  );
};

export default CreateVideoForm;
