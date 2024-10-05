import React from "react";
import { FaSearch } from "react-icons/fa";

import { useGlobalContext } from "../Context";
const SearchBox = ({ what, query, queryFunc }) => {
  return (
    <div className="search-box">
      <form>
        <div className="inp-holder">
          <FaSearch className="search-icon" />
          <input
            type="text"
            value={query}
            onChange={(e) => queryFunc(e.target.value)}
            placeholder={`Search ${what}...`}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
