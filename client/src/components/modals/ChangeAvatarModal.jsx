import React, { useEffect, useRef, useState } from "react";
import { FaChevronUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { useGlobalContext } from "../../Context";

import { avatars } from "../../data/avatars";

const ChangeAvatarModal = () => {
  const { avatarModal, setAvatarModal } = useGlobalContext();

  const containerRef = useRef(null);
  const slideRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: 0,
        left: 100, // Adjust this value based on how much you want to scroll
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
              <div className="avatar-holder" key={i}>
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
      </div>
    </div>
  );
};

export default ChangeAvatarModal;
