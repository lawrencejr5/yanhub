import React from "react";
import { useGlobalContext } from "../Context";

const Pagination = () => {
  const { page, setPage, limit, allTasks } = useGlobalContext();

  const totalPages = Math.ceil(allTasks.length / limit);

  const paginationNum = [];
  let i;
  for (i = 0; i < totalPages; i++) {
    if (i >= 5) break;
    paginationNum.push(i + 1);
  }

  const goPrev = () => {
    setPage((prev) => {
      if (prev === 1) return totalPages;
      return prev - 1;
    });
  };

  const goNext = () => {
    setPage((prev) => {
      if (prev === totalPages) return 1;
      return prev + 1;
    });
  };

  if (limit > allTasks.length) return;
  return (
    <div className="pagination-container center">
      <div className="btns-container">
        <button onClick={goPrev}>...Prev</button>
        {paginationNum.map((i, index) => {
          return (
            <button
              key={index}
              className={i === page ? "active" : ""}
              onClick={() => setPage(i)}
            >
              {i}
            </button>
          );
        })}
        <button onClick={goNext}>Next...</button>
      </div>
    </div>
  );
};

export default Pagination;
