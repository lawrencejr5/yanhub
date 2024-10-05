import React from "react";
import { FaRegBell, FaSun, FaMoon } from "react-icons/fa";

import { useGlobalContext } from "../Context";

const Bell = () => {
  const { theme, toggleTheme } = useGlobalContext();
  return (
    <div className="theme-div" onClick={toggleTheme}>
      {theme === "dark" ? <FaMoon /> : <FaSun />}
    </div>
  );
};

export default Bell;
