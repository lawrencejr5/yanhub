import React from "react";
import { FaChevronUp } from "react-icons/fa";

import { useGlobalContext } from "../Context";

const EditDetailsModal = () => {
  const { editModal, setEditModal } = useGlobalContext();
  return (
    <div
      className={
        editModal
          ? "edit-modal-container edit-modal-open"
          : "edit-modal-container edit-modal-close"
      }
    >
      <div className="edit-modal">
        <div className="header">
          <h2>Edit your details</h2>
          <FaChevronUp
            style={{ cursor: "pointer" }}
            onClick={() => setEditModal(false)}
          />
        </div>
        <form>
          <div className="inp-holder">
            <label htmlFor="uname">Username</label>
            <input type="text" id="uname" placeholder="" />
          </div>
          <div className="inp-holder">
            <label htmlFor="fname">Fullname</label>
            <input type="text" id="fname" placeholder="" />
          </div>
          <div className="inp-holder">
            <label htmlFor="bio">Bio</label>
            <input type="text" id="bio" placeholder="" />
          </div>
          <div className="inp-holder">
            <label htmlFor="dob">DOB</label>
            <input type="date" id="dob" placeholder="" />
          </div>
          <div className="inp-holder">
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" placeholder="" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDetailsModal;
