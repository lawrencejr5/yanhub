import React, { useEffect, useRef, useState } from "react";
import { FaChevronUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

import { useGlobalContext } from "../../Context";

import { avatars } from "../../data/avatars";

const ChangeAvatarModal = () => {
  const {
    avatarModal,
    setAvatarModal,
    endpoint,
    setBtnLoad,
    btnLoad,
    fetchUser,
    setNotification,
  } = useGlobalContext();

  const [selectedDiv, setSelectedDiv] = useState(null);

  const containerRef = useRef(null);
  const slideRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: 0,
        left: 100,
        behavior: "smooth",
      });
    }
  };
  const slideLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: 0,
        left: -100,
        behavior: "smooth",
      });
    }
  };

  const updateAvatar = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (selectedDiv) {
        setBtnLoad(true);
        const { data } = await axios.patch(
          `${endpoint}/users/avatar`,
          { img: selectedDiv },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBtnLoad(false);
        setNotification({
          text: data.msg,
          theme: "success",
          status: true,
        });
        fetchUser();
        setAvatarModal(false);
      }
      setAvatarModal(false);
    } catch (err) {
      const {
        response: { data },
      } = err;
      console.log(data);
      setNotification({
        text: data.msg,
        theme: "danger",
        status: true,
      });
    }
  };

  return (
    <div
      className={
        avatarModal
          ? "edit-modal-container edit-modal-open"
          : "edit-modal-container edit-modal-close"
      }
    >
      <div className="edit-modal">
        <div className="header">
          <h2>Change avatar</h2>
          <FaChevronUp
            style={{ cursor: "pointer" }}
            onClick={() => setAvatarModal(false)}
          />
        </div>
        <div className="avatar-container" ref={containerRef}>
          {avatars.map((avatar, i) => {
            return (
              <div
                className={`avatar-holder ${
                  selectedDiv === avatar.img ? "red-border" : ""
                }`}
                key={i}
                onClick={() => setSelectedDiv(avatar.img)}
              >
                <img
                  src={`/imgs/user-icons/${avatar.img}`}
                  height={"60px"}
                  width={"60px"}
                  alt=""
                />
              </div>
            );
          })}

          <button className="btn-right" onClick={slideRight}>
            <FaChevronRight />
          </button>

          <button className="btn-left" onClick={slideLeft}>
            <FaChevronLeft />
          </button>
        </div>
        <form action="" className="apply-btn-holder" onSubmit={updateAvatar}>
          <button>{btnLoad ? "Apllying" : "Apply"}</button>
        </form>
      </div>
    </div>
  );
};

export default ChangeAvatarModal;
