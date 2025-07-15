import React from "react";
import "../styles/changePass.css";
import { useNavigate } from "react-router-dom";
import changePassImage from "../assets/dawnsun_logo.png";

const ChangePassword = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="changePass-page">
      <div className="changePass-left">
        <div className="changePass-content">
          <h1>
            <i>Change Password</i>
          </h1>
          <p>
            <i>
              Welcome.
              <br /> Start your journey now with our management system!
            </i>
          </p>
        </div>
      </div>
      <div className="changePass-right">
        <div className="changePass-form-box">
          <div className="logo-image">
            <img src={changePassImage} alt="changePass Visual" />
          </div>
          <h2>Change Password</h2>
          <p>
            Don’t make your password too complicated, it just makes life harder
            for everyone.
          </p>
          <form onSubmit={handleSubmit}>
            <label>New Password</label>
            <input type="email" placeholder="Enter New Password" required />

            <label>Re-enter Password</label>
            <input type="password" placeholder="Re-Enter Password" required />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
