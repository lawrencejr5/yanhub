import React from "react";

const Empty = () => {
  return (
    <div className="center">
      <div className="empty">
        <strong> You never get any tasks yet....</strong>
        <img src="/imgs/not-found.png" width={"100%"} height={"auto"} />
      </div>
    </div>
  );
};

export default Empty;
