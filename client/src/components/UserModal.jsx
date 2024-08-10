import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../Context";

const UserModal = ({ currUser }) => {
  const { userModal, setUserModal } = useGlobalContext();
  const navigate = useNavigate();
  const goToPage = () => {
    navigate(`/user/${currUser.username}`);
    setUserModal(false);
  };
  return (
    <div
      className={
        userModal
          ? "user-modal-container user-modal-open"
          : "user-modal-container user-modal-close"
      }
    >
      <div className="user-modal">
        <div className="header">
          <FaChevronDown
            style={{ cursor: "pointer" }}
            onClick={() => setUserModal(false)}
          />
        </div>
        <div className="img-holder">
          <img src={`/imgs/user/${currUser.pic}`} alt="" />
        </div>
        <h3>{currUser.fullname}</h3>
        <span>
          @{currUser.username} . {currUser.role}
        </span>
        <div className="btn-holder">
          <button type="button" onClick={() => goToPage()}>
            View more...
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
