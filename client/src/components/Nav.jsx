// modules
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";

// components
import Logo from "./Logo";

// data
import { navList } from "../data/nav";
import { users } from "../data/users";

// custom hooks
import { useGlobalContext } from "../Context";

const Nav = () => {
  const { loggedIn } = useGlobalContext();

  // Get user logged in
  const user = users.find((usr) => usr.username === loggedIn);
  const { pic, username } = user;

  const { pathname } = useLocation();
  return (
    <nav className="relative">
      <div className="sticky">
        <Logo size={"small"} />
        <div className="center">
          <div
            className="avatar"
            style={{ backgroundImage: `url(/imgs/user/${pic})` }}
          ></div>
        </div>
        <br />
        <h4 className="username" style={{ textTransform: "capitalize" }}>
          {username}
        </h4>
        <div className="nav-list">
          <ul>
            {navList.map((item, index) => {
              const { dir, nav, icon } = item;
              return (
                <li key={index}>
                  <Link
                    to={dir}
                    className={pathname === dir ? "link active" : "link"}
                  >
                    {icon}
                    &nbsp; {nav}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="logout">
        <FaPowerOff />
        <Link to="/login" className="link">
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
