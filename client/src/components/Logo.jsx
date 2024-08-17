import React from "react";

const Logo = ({ size }) => {
  return (
    <span className={`logo logo-${size}`}>
      <span id="yan">Yan</span>
      <span id="hub">Hub</span>
    </span>
  );
};

export default Logo;
