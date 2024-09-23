import React from "react";

const Announcements = () => {
  return (
    <div className="announcement-layout">
      <h3>Latest Announcement</h3>
      <div className="annunc">
        <small>10th Sep, 2024</small>
        <br />
        <p>We'll be having a shoot tommorow</p>
        <div className="btn-holder">
          <button id="more">more...</button>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
