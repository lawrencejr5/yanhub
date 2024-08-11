import React, { useEffect, useState } from "react";

// data
import { users } from "../data/users";

// custom hooks
import { useGlobalContext } from "../Context";

const Greet = () => {
  const { loggedIn } = useGlobalContext();

  // Get user logged in
  const user = users.find((usr) => usr.username === loggedIn);
  const { username } = user;

  const [datetime, setDatetime] = useState(new Date());
  const [greet, setGreet] = useState("Good .....");

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setDatetime(new Date());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    const greetInterval = setInterval(() => {
      setGreet(greetFunc());
    }, 1000);
    return () => clearInterval(greetInterval);
  }, []);

  const greetFunc = () => {
    let greeting = "";

    const d = new Date();
    const hr = d.getHours();

    if (hr >= 0 && hr < 12) {
      greeting = "Good Morning";
    } else if (hr >= 12 && hr < 16) {
      greeting = "Good Afternoon";
    } else if (hr >= 16 && hr < 20) {
      greeting = "Good Evening";
    } else {
      greeting = "Good Night";
    }

    return greeting;
  };
  return (
    <div className="greet-component" s>
      <h3>
        {greet} {username}
      </h3>
      <small>{datetime.toString()}</small>
    </div>
  );
};

export default Greet;
