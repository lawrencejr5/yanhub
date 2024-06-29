import React from "react";

const Logo = ({ size }) => {
  return (
    <div className={`logo logo-${size}`}>
      <span id="yan">Yan</span>
      <span id="hub">Hub</span>
    </div>
  );
};

export default Logo;
