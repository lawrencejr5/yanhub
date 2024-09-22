import React from "react";

const Announcements = () => {
  return (
    <div className="announcement-layout">
      <h2>Announcements</h2>
      <div className="annunc">
        <small>10th september, 2024</small>
        <br />
        <p>We'll be having a shoot tommorow</p>
        <div className="btn-holder">
          <button id="more">more...</button>
          <button id="add">+</button>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
