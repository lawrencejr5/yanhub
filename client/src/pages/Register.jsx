import { React, useEffect } from "react";

import { FaLock, FaPhone, FaUser, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
const Register = () => {
  useEffect(() => {
    document.title = "Yahhub - Register";
  }, []);
  return (
    <main className="register-main">
      <Logo size={"big"} />
      <div className="center">
        <section className="container">
          <div className="lhs"></div>
          <div className="rhs">
            <h2>Register</h2>
            <form action="">
              <div className="inp-handler">
                <FaUser className="icon" />
                <input type="text" placeholder="Fullname" autoComplete="off" />
              </div>
              <div className="inp-handler">
                <FaEnvelope className="icon left" />
                <input
                  type="username"
                  placeholder="Username"
                  autoComplete="off"
                />
              </div>
              <div className="inp-handler">
                <FaPhone className="icon" />
                <input type="tel" placeholder="Phone" autoComplete="off" />
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
                <button>Register</button>
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
