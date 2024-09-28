import React, { useEffect, useState } from "react";

// data
import { users } from "../data/users";

// custom hooks
import { useGlobalContext } from "../Context";

const Greet = () => {
  const { loggedIn, signedIn } = useGlobalContext();

  // Get user logged in
  const user = users.find((usr) => usr.username === loggedIn);
  const { username } = user;

  const [datetime, setDatetime] = useState(new Date());
  const [greet, setGreet] = useState("..... Oma");

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
      greeting = "Ututu Oma";
    } else if (hr >= 12 && hr < 16) {
      greeting = "Efifie Oma";
    } else if (hr >= 16 && hr < 20) {
      greeting = "Mgbede Oma";
    } else {
      greeting = "Aniasi Oma";
    }

    return greeting;
  };
  return (
    <div className="greet-component">
      <h3>
        {greet} {signedIn.username}
      </h3>
      <small>{datetime.toString()}</small>
    </div>
  );
};

export default Greet;
