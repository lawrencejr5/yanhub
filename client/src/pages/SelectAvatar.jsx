import React, { useState } from "react";

import Logo from "../components/Logo";

import { avatars } from "../data/avatars";

const SelectAvatar = () => {
  const [selectedDiv, setSelectedDiv] = useState(null);

  return (
    <main className="avatar-main">
      <Logo size={"big"} />
      <section className="avatar-container">
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
        <form action="">
          <input type="hidden" value={selectedDiv} />
          {selectedDiv ? <button>Proceed</button> : <button>Skip</button>}
        </form>
      </section>
    </main>
  );
};

export default SelectAvatar;
