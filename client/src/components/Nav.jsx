// modules
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPowerOff, FaBars } from "react-icons/fa";

// components
import Logo from "./Logo";

// data
import { navList } from "../data/nav";

// custom hooks
import { useGlobalContext } from "../Context";

const Nav = () => {
  const { mobileNav, setMobileNav, signedIn } = useGlobalContext();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setMobileNav(false);
    navigate("/login");
  };

  return (
    // <>
    <nav className="relative">
      <div className="big-nav">
        <div className="sticky">
          <Logo size={"small"} />
          <div className="center">
            <div
              className="avatar"
              style={{
                backgroundImage: `url(/imgs/user-icons/${signedIn.pic})`,
              }}
            ></div>
          </div>
          <br />
          <h4 className="username">@{signedIn.username}</h4>
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
          <button onClick={logout} className="link">
            Logout
          </button>
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
              style={{
                backgroundImage: `url(/imgs/user-icons/${signedIn.pic})`,
              }}
            ></div>
          </div>
          <br />
          <h4 className="username">@{signedIn.username}</h4>
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
            <div className="logout">
              <FaPowerOff />
              <button onClick={logout} className="link">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    // </>
  );
};

export default Nav;
