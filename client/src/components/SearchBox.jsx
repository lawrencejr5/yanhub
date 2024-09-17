import React from "react";
import { FaSearch } from "react-icons/fa";

import { useGlobalContext } from "../Context";
const SearchBox = ({ what }) => {
  const { searchQuery, setSearchQuery } = useGlobalContext();

  return (
    <div className="search-box">
      <form>
        <div className="inp-holder">
          <FaSearch className="search-icon" />
          <input
            type="text"
            value={searchQuery}
            autoFocus
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${what}...`}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
