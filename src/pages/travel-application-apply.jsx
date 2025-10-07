import React, { useState } from "react";
import logo from "../assets/dawnsun_logo.png";
import "../styles/travel-application-apply.css";

export default function TravelApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    email: "",
    contact: "",
    department: "",
    designation: "",
    arrivalDate: "",
    departureDate: "",
    preference: "",
    clientName: "",
    reportingManager: "",
    otherInfo: "",
    acceptPolicy: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.acceptPolicy) {
      alert("Please accept the travel policy before submitting.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/travel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Form submitted successfully!");
        setFormData({
          name: "",
          city: "",
          email: "",
          contact: "",
          department: "",
          designation: "",
          departureDate: "",
          arrivalDate: "",
          preference: "",
          clientName: "",
          reportingManager: "",
          otherInfo: "",
          acceptPolicy: false,
        });
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="top-form-header">
        <img src={logo} alt="Company Logo" />
        <h2>Travel Application Form</h2>
      </div>

      <hr />
      <form onSubmit={handleSubmit}>
        {/* Name + City */}
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
            <label>City / Destination</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email + Contact */}
        <div className="form-row">
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
        </div>

        {/* Department + Designation */}
        <div className="form-row">
          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
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

        {/* Arrival + Departure */}
        <div className="form-row">
          <div className="form-group">
            <label>
              Departure Date <span className="required">*</span>
            </label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              Arrival Date <span className="required">*</span>
            </label>
            <input
              type="date"
              name="arrivalDate"
              value={formData.arrivalDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Preference + Client Name */}
        <div className="form-row">
          <div className="form-group">
            <label>Preference</label>
            <select
              name="preference"
              value={formData.preference}
              onChange={handleChange}
            >
              <option value="">Select Preference</option>
              <option value="Train">Train</option>
              <option value="Flight">Flight</option>
              <option value="Bus">Bus</option>
            </select>
          </div>
          <div className="form-group">
            <label>Client Name</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Reporting Manager + Other Info */}
        <div className="form-row">
          <div className="form-group">
            <label>Reporting Manager</label>
            <input
              type="text"
              name="reportingManager"
              value={formData.reportingManager}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Other Information</label>
            <input
              type="text"
              name="otherInfo"
              value={formData.otherInfo}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Travel Policy Checkbox */}
        <div className="form-checkbox">
          <input
            type="checkbox"
            name="acceptPolicy"
            checked={formData.acceptPolicy}
            onChange={handleChange}
            required
          />
          <label>
            I accept the{" "}
            <a
              href="/travel-policy.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Travel Policy
            </a>
          </label>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
