import React, { useEffect, useState } from "react";
import { FaLock, FaPhone, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Logo from "../components/Logo";
import Notification from "../components/Notification";

import { useGlobalContext } from "../Context";
const Register = () => {
  const {
    endpoint,
    notification,
    setNotification,
    btnLoad,
    setBtnLoad,
    fetchUser,
  } = useGlobalContext();

  const navigate = useNavigate();

  const [input, setInput] = useState({
    fullname: "",
    username: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  useEffect(() => {
    document.title = "Yahhub - Register";
  }, []);

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const reset = () => {
    setInput({
      fullname: "",
      username: "",
      phone: "",
      password: "",
      cpassword: "",
    });
    setBtnLoad(false);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const { username, fullname, phone, password, cpassword } = input;
    try {
      setBtnLoad(true);
      const { data } = await axios.post(`${endpoint}/users/register`, {
        username,
        fullname,
        phone,
        password,
        cpassword,
      });
      reset();
      console.log(data);
      setNotification({ text: data.msg, theme: "success", status: true });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user);
      setTimeout(() => {
        navigate("avatar");
      }, 2000);
      fetchUser();
    } catch (err) {
      const {
        response: { data },
      } = err;
      setBtnLoad(false);
      console.log(data);
      setNotification({ text: data.msg, theme: "danger", status: true });
    }
  };

  return (
    <main className="register-main">
      <Notification notification={notification} />
      <Logo size={"big"} />
      <div className="center">
        <section className="container">
          <div className="lhs"></div>
          <div className="rhs">
            <h2>Register</h2>
            <small>**Try dey use your head....</small>
            <form action="" onSubmit={registerUser}>
              <div className="inp-handler">
                <FaUser className="icon" />
                <input
                  type="text"
                  placeholder="Fullname"
                  name="fullname"
                  autoComplete="off"
                  onChange={handleChange}
                  value={input.fullname}
                />
              </div>
              <div className="inp-handler">
                <FaUser className="icon left" />
                <input
                  type="username"
                  placeholder="Username"
                  autoComplete="off"
                  name="username"
                  onChange={handleChange}
                  value={input.username}
                />
              </div>
              <div className="inp-handler">
                <FaPhone className="icon" />
                <input
                  type="tel"
                  placeholder="Phone"
                  autoComplete="off"
                  name="phone"
                  onChange={handleChange}
                  value={input.phone}
                />
              </div>
              <div className="inp-handler">
                <FaLock className="icon" />
                <input
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                  name="password"
                  onChange={handleChange}
                  value={input.password}
                />
              </div>
              <div className="inp-handler">
                <FaLock className="icon" />
                <input
                  type="password"
                  placeholder="Confirm password"
                  autoComplete="off"
                  name="cpassword"
                  onChange={handleChange}
                  value={input.cpassword}
                />
              </div>
              <div className="btn-handler">
                <button>{btnLoad ? "Registering..." : "Register"}</button>
              </div>
              <br />
              <center>
                <span>
                  Already have an account? <Link to={"/login"}>Login</Link>
                </span>
              </center>
              {/* <center>
                <Link to="help">Need help?</Link>
              </center> */}
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
