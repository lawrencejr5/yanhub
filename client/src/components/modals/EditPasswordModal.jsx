import React, { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { useNaviate, useNavigate } from "react-router-dom";
import axios from "axios";

import { useGlobalContext } from "../../Context";

const EditPasswordModal = () => {
  const navigate = useNavigate();

  const {
    editPassModal,
    setEditPassModal,
    btnLoad,
    setBtnLoad,
    endpoint,
    setNotification,
  } = useGlobalContext();

  const [input, setInput] = useState({ oPass: "", nPass: "", cPass: "" });

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const updatePass = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      setBtnLoad(true);
      await axios.patch(
        `${endpoint}/users/pass`,
        {
          oldPass: input.oPass,
          newPass: input.nPass,
          confirmPass: input.cPass,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBtnLoad(false);
      setEditPassModal(false);
      setNotification({
        text: "Password updated, signing out...",
        theme: "success",
        status: true,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setTimeout(() => {
        navigate("../login");
      }, 2000);
    } catch (err) {
      const {
        response: { data },
      } = err;
      setBtnLoad(false);
      setEditPassModal(false);
      setNotification({
        text: data.msg,
        theme: "danger",
        status: true,
      });
      console.log(data);
    }
  };

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
        <form onSubmit={updatePass}>
          <div className="inp-handler">
            <div className="inp-holder">
              <label htmlFor="opass">Old Password</label>
              <input
                type="password"
                id="opass"
                name="oPass"
                placeholder="old password"
                onChange={handleChange}
                value={input.oPass}
              />
            </div>
            <div className="inp-holder">
              <label htmlFor="npass">New password</label>
              <input
                type="password"
                id="npass"
                name="nPass"
                placeholder="new password"
                onChange={handleChange}
                value={input.nPass}
              />
            </div>
            <div className="inp-holder">
              <label htmlFor="cpass">Confirm password</label>
              <input
                type="password"
                id="cpass"
                name="cPass"
                placeholder="confirm new password"
                onChange={handleChange}
                value={input.cPass}
              />
            </div>
          </div>
          <div className="btn-holder">
            <button>{btnLoad ? "Saving..." : "Save changes"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPasswordModal;
