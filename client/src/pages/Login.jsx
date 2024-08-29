import { React, useEffect, useState } from "react";

import { FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

import Logo from "../components/Logo";
import Notification from "../components/Notification";

import { useGlobalContext } from "../Context";
const Login = () => {
  useEffect(() => {
    document.title = "Yahhub - Login";
  }, []);

  const { endpoint, notification, setNotification, btnLoad, setBtnLoad } =
    useGlobalContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const reset = () => {
    setUsername("");
    setPassword("");
    setBtnLoad(false);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      setBtnLoad(true);
      const { data } = await axios.post(`${endpoint}/users/login`, {
        username,
        password,
      });

      console.log(data);
      setNotification({ text: data.msg, theme: "success", status: true });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user);
      reset();
    } catch (err) {
      const {
        response: { data },
      } = err;
      console.log(data);
      setNotification({ text: data.msg, theme: "danger", status: true });
    }
  };
  return (
    <main className="login-main">
      <Notification
        text={notification.text}
        theme={notification.theme}
        status={notification.status}
      />
      <Logo size={"big"} />
      <div className="center">
        <section className="container">
          <div className="lhs">
            <h2>Login</h2>
            <small>**Try dey use your head....</small>
            <form action="" onSubmit={loginUser}>
              <div className="inp-handler">
                <FaUser className="icon" />
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="inp-handler">
                <FaLock className="icon" />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="btn-handler">
                <button>{btnLoad ? "Signin..." : "Login"}</button>
              </div>
              <br />
              <center>
                <span>
                  Don't have an account? <Link to={"/register"}>Register</Link>
                </span>
              </center>
              {/* <center>
                <Link to="help">Need help?</Link>
              </center> */}
            </form>
          </div>
          <div className="rhs"></div>
        </section>
      </div>
    </main>
  );
};

export default Login;
