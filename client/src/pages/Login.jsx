import { React, useEffect } from "react";

import { FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
const Login = () => {
  useEffect(() => {
    document.title = "Yahhub - Login";
  }, []);
  return (
    <main className="login-main">
      <Logo size={"big"} />
      <div className="center">
        <section className="container">
          <div className="lhs">
            <h2>Login</h2>
            <small>**Try dey use your head....</small>
            <form action="">
              <div className="inp-handler">
                <FaUser className="icon" />
                <input type="text" placeholder="Username" autoComplete="off" />
              </div>
              <div className="inp-handler">
                <FaLock className="icon" />
                <input
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                />
              </div>
              <div className="btn-handler">
                <button>Login</button>
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
