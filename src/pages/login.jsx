import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import loginImage from "../assets/dawnsun_logo.png";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-content">
          <h1>
            <i>Login</i>
          </h1>
          <p>
            <i>
              Welcome.
              <br /> Start your journey now with our management system!
            </i>
          </p>
        </div>
      </div>
      <div className="login-right">
        <div className="login-form-box">
          <div className="logo-image">
            <img src={loginImage} alt="Login Visual" />
          </div>
          <h2>Login</h2>
          <p>Enter your email address and password to log in.</p>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />

            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
            <div className="login-extra">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
