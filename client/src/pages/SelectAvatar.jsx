import React from "react";

import Logo from "../components/Logo";

import { avatars } from "../data/avatars";
const SelectAvatar = () => {
  return (
    <main className="avatar-main">
      <Logo size={"big"} />
      <section className="avatar-container">
        {avatars.map((avatar, i) => {
          return (
            <div className="avatar-holder" key={i}>
              <img
                src={`/imgs/user-icons/${avatar.img}`}
                width={"100px"}
                height={"100px"}
                alt=""
              />
            </div>
          );
        })}
        <button disabled>select avatar</button>
      </section>
    </main>
  );
};

export default SelectAvatar;
