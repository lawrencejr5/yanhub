import React from "react";

import { months } from "../data/date";

import { useGlobalContext } from "../Context";
const LeaderboardNav = () => {
  const { leaderboard } = useGlobalContext();
  const d = new Date();
  const currMonth = months[d.getMonth()];
  return (
    <aside className="relative">
      <div className="sticky">
        <h4>{currMonth} Leaderboard</h4>

        <div className="list">
          <ul>
            {leaderboard.slice(0, 5).map((item, index) => {
              const { name, taskCount } = item;
              return (
                <li key={index} className={index === 0 ? "first" : ""}>
                  <span>{index + 1}.&nbsp;</span>
                  {name}
                  <br />
                  <small>{taskCount} task(s)</small>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default LeaderboardNav;
