import React from "react";

import { leaderboard } from "../data/leaderboard";
const LeaderboardNav = () => {
  return (
    <aside className="relative">
      <div className="sticky">
        <h4>June Leaderboard</h4>

        <div className="list">
          <ul>
            {leaderboard.map((item, index) => {
              const { rank, username, xp } = item;
              return (
                <li key={index} className={rank === 1 ? "first" : ""}>
                  <span>{rank}.&nbsp;</span>
                  {username}
                  <br />
                  <small>{xp || "0xp"}</small>
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
