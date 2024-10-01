import React from "react";

const LoadingContainer = ({ full }) => {
  return (
    <div className={`loading-container-${full ? "full" : "middle"}`}>
      <div className="loading"></div>
    </div>
  );
};

export default LoadingContainer;
