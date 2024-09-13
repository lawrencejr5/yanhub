import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";

import { useGlobalContext } from "../../Context";

const AssignModal = () => {
  const {
    assignModal,
    setAssignModal,
    assignTask,
    currVid,
    endpoint,
    token,
    fetchUsers,
    allUsers,
    checked,
    setChecked,
    setNotification,
  } = useGlobalContext();

  useEffect(() => {
    fetchUsers();
  }, []);

  const [userInp, setUserInp] = useState([]);
  useEffect(() => {
    console.log(userInp);
  }, [userInp]);

  const drop = () => {
    setAssignModal(false);
    setChecked(false);
  };

  const handleAssignment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${endpoint}/tasks`,
        {
          type: assignTask,
          vidId: currVid._id,
          assignedTo: userInp,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAssignModal(false);
      setUserInp([]);
      setChecked(false);
      setNotification({ text: data.msg, theme: "success", status: true });
    } catch (err) {
      const {
        response: { data },
      } = err;
      setNotification({ text: data.msg, theme: "danger", status: true });
      console.log(data);
    }
  };

  const handleChange = (e) => {
    setUserInp((prev) => {
      if (prev.includes(e.target.value)) {
        const newItems = prev.filter((item) => item !== e.target.value);
        return newItems;
      } else if (!prev.includes(e.target.value)) {
        return [...prev, e.target.value];
      }
    });
  };

  return (
    <div
      className={`assign-modal-container
        ${assignModal ? "assign-modal-open" : "assign-modal-close"}
        `}
    >
      <div className="assign-modal">
        <div className="header">
          <h3>{`Assign ${assignTask} to...`}</h3>
          <FaChevronDown style={{ cursor: "pointer" }} onClick={drop} />
        </div>
        <form className="body" onSubmit={handleAssignment}>
          {allUsers.map((user, index) => {
            const { _id: userId, username, pic } = user;
            return (
              <div className="assignees" key={index}>
                <input
                  type="checkbox"
                  checked={checked}
                  value={userId}
                  onChange={handleChange}
                  id={userId}
                />
                <img
                  src={`/imgs/user-icons/${pic}`}
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
