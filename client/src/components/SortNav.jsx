import React from "react";

const SortNav = ({ sortVal, setSortVal }) => {
  return (
    <div className="sort-nav">
      {/* <select name="" id="">
        <option value="">sort...</option>
        <option value="undone">undone</option>
        <option value="ongoing">ongoing</option>
        <option value="completed">completed</option>
          </select> */}
      <button
        className={sortVal === "" ? "active" : ""}
        onClick={() => setSortVal("")}
      >
        All
      </button>
      <button
        id="undone"
        className={sortVal === "undone" ? "active" : ""}
        onClick={(e) => setSortVal(e.target.id)}
      >
        undone
      </button>
      <button
        id="ongoing"
        className={sortVal === "ongoing" ? "active" : ""}
        onClick={(e) => setSortVal(e.target.id)}
      >
        ongoing
      </button>
      <button
        id="completed"
        className={sortVal === "completed" ? "active" : ""}
        onClick={(e) => setSortVal(e.target.id)}
      >
        completed
      </button>
    </div>
  );
};

export default SortNav;
