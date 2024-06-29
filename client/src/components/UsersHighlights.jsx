import React from "react";
import { Link } from "react-router-dom";

import { users } from "../data/users";

const UsersHighlights = () => {
  return (
    <div className="user-highlights">
      <h3>Take peak into other users</h3>
      <div className="container">
        {users.map((user, i) => {
          const { username, pic } = user;
          return (
            <div className="user" key={i}>
              <div
                className="pic"
                style={{
                  backgroundImage: `url(/imgs/user/${pic})`,
                }}
              ></div>
              <div className="name">{username}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersHighlights;
