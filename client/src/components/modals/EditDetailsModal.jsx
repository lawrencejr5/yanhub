import React, { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import axios from "axios";

import { useGlobalContext } from "../../Context";

const EditDetailsModal = () => {
  const {
    editModal,
    setEditModal,
    signedIn,
    endpoint,
    setNotification,
    btnLoad,
    setBtnLoad,
    fetchUser,
  } = useGlobalContext();

  const { username, fullname, phone, bio, dob } = signedIn;

  const [input, setInput] = useState({
    username: username || "",
    fullname: fullname || "",
    phone: phone || "",
    dob: dob || "",
    bio: bio || "",
  });

  useEffect(() => {
    setInput({
      username: username || "",
      fullname: fullname || "",
      phone: phone || "",
      dob: dob || "",
      bio: bio || "",
    });
  }, [signedIn]);

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("user");

    try {
      setBtnLoad(true);
      const { data } = await axios.patch(`${endpoint}/users/${userId}`, {
        ...input,
      });
      if (data) {
        fetchUser();
        setBtnLoad(false);
        setEditModal(false);
        setNotification({ text: data.msg, theme: "success", status: true });
      }
    } catch (err) {
      const {
        response: { data },
      } = err;
      setBtnLoad(false);
      setNotification({ text: data.msg, theme: "danger", status: true });
      setEditModal(false);
      console.log(data);
    }
  };
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
        <form onSubmit={handleSubmit}>
          <div className="inp-handler">
            <div className="inp-holder">
              <label htmlFor="uname">Username</label>
              <input
                type="text"
                id="uname"
                name="username"
                placeholder="exp: stanely"
                value={input.username}
                onChange={handleChange}
              />
            </div>
            <div className="inp-holder">
              <label htmlFor="fname">Fullname</label>
              <input
                type="text"
                id="fname"
                name="fullname"
                placeholder="exp: Gospel John"
                value={input.fullname}
                onChange={handleChange}
              />
            </div>
            <div className="inp-holder">
              <label htmlFor="bio">Bio</label>
              <input
                type="text"
                id="bio"
                name="bio"
                placeholder="exp: Use your head!"
                value={input.bio}
                onChange={handleChange}
              />
            </div>
            <div className="inp-holder">
              <label htmlFor="dob">DOB</label>
              <input
                type="date"
                id="dob"
                name="dob"
                placeholder=""
                value={input.dob}
                onChange={handleChange}
              />
            </div>
            <div className="inp-holder">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="exp: 09025816161"
                value={input.phone}
                onChange={handleChange}
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

export default EditDetailsModal;
