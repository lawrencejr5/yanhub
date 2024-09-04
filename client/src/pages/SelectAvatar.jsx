import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import Notification from "../components/Notification";

import { avatars } from "../data/avatars";

import { useGlobalContext } from "../Context";

const SelectAvatar = () => {
  const [selectedDiv, setSelectedDiv] = useState(null);

  const navigate = useNavigate();

  const {
    endpoint,
    setBtnLoad,
    btnLoad,
    fetchUser,
    notification,
    setNotification,
  } = useGlobalContext();

  const updateAvatar = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (selectedDiv) {
        setBtnLoad(true);
        const { data } = await axios.patch(
          `${endpoint}/users/update-pic`,
          { img: selectedDiv },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBtnLoad(false);
        fetchUser();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
      setNotification({
        text: "Redirecting...",
        theme: "success",
        status: true,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
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
    <main className="avatar-main">
      <Notification
        text={notification.text}
        theme={notification.theme}
        status={notification.status}
      />
      <Logo size={"big"} />
      <section className="avatar-container">
        <h1>Choose an avatar...</h1>
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
                width={"100px"}
                height={"100px"}
                alt=""
              />
            </div>
          );
        })}
        <form action="" onSubmit={updateAvatar}>
          {selectedDiv ? (
            <button>{btnLoad ? "..." : "Proceed"}</button>
          ) : (
            <button>{btnLoad ? "..." : "Skip"}</button>
          )}
        </form>
      </section>
    </main>
  );
};

export default SelectAvatar;
