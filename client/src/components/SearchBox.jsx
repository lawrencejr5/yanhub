import React from "react";
import { FaSearch } from "react-icons/fa";
const SearchBox = () => {
  return (
    <div className="search-box">
      <form>
        <div className="inp-holder">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search users..." />
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
