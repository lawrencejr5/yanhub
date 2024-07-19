import React from "react";
import { FaChevronDown } from "react-icons/fa";

import { useGlobalContext } from "../Context";

import { users } from "../data/users";

const AssignModal = () => {
  const { assignModal, setAssignModal } = useGlobalContext();

  return (
    <div
      className={`assign-modal-container
        ${assignModal ? "assign-modal-open" : "assign-modal-close"}
        `}
    >
      <div className="assign-modal">
        <div className="header">
          <h3>Assign subtitling to...</h3>
          <FaChevronDown
            style={{ cursor: "pointer" }}
            onClick={() => setAssignModal(false)}
          />
        </div>
        <form className="body">
          {users.map((user, index) => {
            const { username, pic } = user;
            return (
              <div className="assignees" key={index}>
                <input type="checkbox" id="checkbox" />
                <img
                  src={`/imgs/user/${pic}`}
                  width={"30px"}
                  height={"auto"}
                  alt=""
                />
                <label htmlFor="checkbox">{username}</label>
              </div>
            );
          })}
          <br />
          <div className="btn-holder">
            <button>Save changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignModal;
