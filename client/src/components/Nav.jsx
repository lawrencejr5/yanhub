// modules
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPowerOff, FaBars } from "react-icons/fa";

// components
import Logo from "./Logo";

// data
import { navList } from "../data/nav";
import { users } from "../data/users";

// custom hooks
import { useGlobalContext } from "../Context";

const Nav = () => {
  const { loggedIn, mobileNav, setMobileNav } = useGlobalContext();

  // Get user logged in
  const user = users.find((usr) => usr.username === loggedIn);
  const { pic, username } = user;

  const { pathname } = useLocation();
  return (
    // <>
    <nav className="relative">
      <div className="big-nav">
        <div className="sticky">
          <Logo size={"small"} />
          <div className="center">
            <div
              className="avatar"
              style={{ backgroundImage: `url(/imgs/user/${pic})` }}
            ></div>
          </div>
          <br />
          <h4 className="username">@{username}</h4>
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
      </div>
      <div className="small-nav">
        <div className={`sticky nav-box ${mobileNav ? "collapsed" : "closed"}`}>
          <div className="header">
            <Logo size={"small"} />
            <FaBars
              className="drop-icon"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setMobileNav((prev) => {
                  return !prev;
                });
              }}
            />
          </div>
          <div className="center">
            <div
              className="avatar"
              style={{ backgroundImage: `url(/imgs/user/${pic})` }}
            ></div>
          </div>
          <br />
          <h4 className="username">@{username}</h4>
          <div className="nav-list">
            <ul>
              {navList.map((item, index) => {
                const { dir, nav, icon } = item;
                return (
                  <li key={index}>
                    <Link
                      to={dir}
                      onClick={() => {
                        setMobileNav(false);
                      }}
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
      </div>
    </nav>
    // </>
  );
};

export default Nav;
