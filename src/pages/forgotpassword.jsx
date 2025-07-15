import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/forgotpassword.css";
import forgotImage from "../assets/dawnsun_logo.png";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/change-password");
  };
  return (
    <div className="forgot-page">
      <div className="forgot-left">
        <div className="Forgot-content">
          <h1>
            <i>Forgot Password</i>
          </h1>
          <p>
            <i>
              Welcome. <br /> Start your journey now with our management system!
            </i>
          </p>
        </div>
      </div>
      <div className="forgot-right">
        <div className="forgot-form-box">
          <div className="logo-image">
            <img src={forgotImage} alt="forgot-image" />
          </div>
          <h2>Forgot Password</h2>
          <p>
            Enter the email you previously registered with, and you will receive
            an email.
          </p>
          <form onSubmit={handleSubmit}>
            <label>Email Address / Employee ID</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              required
            />

            <button type="submit">Submit</button>

            <p className="back-login">
              Oh, remember your password now? Just
              <Link to="/"> Login!</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
