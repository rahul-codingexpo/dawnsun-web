import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import loginImage from "../assets/dawnsun_logo.png";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post("http://localhost:5000/api/auth/login", {
      //   email,
      //   password,
      // });
      const res = await axios.post("http://139.59.68.77:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token); // store token
      localStorage.setItem("user", JSON.stringify(res.data.user)); //user info
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
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
              <br />
              Start your journey now with our management system!
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
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

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
