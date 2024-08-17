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
          <div className="inp-handler">
            <div className="inp-holder">
              <label htmlFor="uname">Username</label>
              <input type="text" id="uname" placeholder="exp: stanely" />
            </div>
            <div className="inp-holder">
              <label htmlFor="fname">Fullname</label>
              <input type="text" id="fname" placeholder="exp: Gospel John" />
            </div>
            <div className="inp-holder">
              <label htmlFor="bio">Bio</label>
              <input type="text" id="bio" placeholder="exp: Use your head!" />
            </div>
            <div className="inp-holder">
              <label htmlFor="dob">DOB</label>
              <input type="date" id="dob" placeholder="" />
            </div>
            <div className="inp-holder">
              <label htmlFor="phone">Phone</label>
              <input type="text" id="phone" placeholder="exp: 09025816161" />
            </div>
          </div>
          <div className="btn-holder">
            <button>Save changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDetailsModal;
