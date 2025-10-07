import React, { useState } from "react";
import axios from "axios";
import "./../styles/Leave-application-apply.css";
import logo from "../assets/dawnsun_logo.png";

export default function LeaveApplicationApply() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    department: "",
    designation: "",
    fromDate: "",
    toDate: "",
    hod: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/leaves", formData);
      alert("Leave application submitted successfully!");
      setFormData({
        name: "",
        email: "",
        contact: "",
        department: "",
        designation: "",
        fromDate: "",
        toDate: "",
        hod: "",
        status: "Pending",
      });
    } catch (err) {
      console.error(err);
      alert("Error submitting leave application");
    }
  };

  return (
    <div className="form-container">
      <div className="top-form-header">
        <img src={logo} alt="logo" />
        <h2>Leave Application Form</h2>
      </div>
      <hr />

      <form onSubmit={handleSubmit}>
        {/* Name + Email */}
        <div className="form-row">
          <div className="form-group">
            <label>
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              Email ID <span className="required">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Contact + Department */}
        <div className="form-row">
          <div className="form-group">
            <label>
              Contact No. <span className="required">*</span>
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* From + To Date */}
        <div className="form-row">
          <div className="form-group">
            <label>
              From <span className="required">*</span>
            </label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              To <span className="required">*</span>
            </label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* HOD + Designation */}
        <div className="form-row">
          <div className="form-group">
            <label>HOD</label>
            <select name="hod" value={formData.hod} onChange={handleChange}>
              <option value="">Select HOD</option>
              <option value="Varun Saxena">Varun Saxena</option>
              <option value="Devesh Kumar">Devesh Kumar</option>
              <option value="John Doe">John Doe</option>
            </select>
          </div>
          <div className="form-group">
            <label>Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
