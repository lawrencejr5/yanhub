import React, { useEffect, useState } from "react";

const Greet = () => {
  const [datetime, setDatetime] = useState(new Date());
  const [greet, setGreet] = useState("");

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
    <div className="header">
      <h3>{greet} Lawrencejr</h3>
      <small>{datetime.toString()}</small>
    </div>
  );
};

export default Greet;
