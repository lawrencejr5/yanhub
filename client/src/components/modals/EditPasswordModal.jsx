import React from "react";
import { FaChevronUp } from "react-icons/fa";

import { useGlobalContext } from "../../Context";

const EditPasswordModal = () => {
  const { editPassModal, setEditPassModal } = useGlobalContext();

  return (
    <div
      className={
        editPassModal
          ? "edit-modal-container edit-modal-open"
          : "edit-modal-container edit-modal-close"
      }
    >
      <div className="edit-modal">
        <div className="header">
          <h2>Update Password</h2>
          <FaChevronUp
            style={{ cursor: "pointer" }}
            onClick={() => setEditPassModal(false)}
          />
        </div>
        <form>
          <div className="inp-handler">
            <div className="inp-holder">
              <label htmlFor="opass">Old Password</label>
              <input type="text" id="opass" placeholder="old password" />
            </div>
            <div className="inp-holder">
              <label htmlFor="npass">New password</label>
              <input type="text" id="npass" placeholder="new password" />
            </div>
            <div className="inp-holder">
              <label htmlFor="cpass">Confirm password</label>
              <input
                type="text"
                id="cpass"
                placeholder="confirm new password"
              />
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

export default EditPasswordModal;
