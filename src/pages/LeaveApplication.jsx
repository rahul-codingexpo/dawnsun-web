import React, { useState } from "react";
import "../styles/LeaveApplication.css";

const leaveData = [
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "0987654321",
    department: "Sales",
    designation: "BD",
    from: "07/4/25",
    to: "07/6/25",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "0987654321",
    department: "Sales",
    designation: "BD",
    from: "07/4/25",
    to: "07/9/25",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "0987654321",
    department: "Sales",
    designation: "BD",
    from: "07/4/25",
    to: "07/10/25",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "0987654321",
    department: "Sales",
    designation: "BD",
    from: "07/4/25",
    to: "07/15/25",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "0987654321",
    department: "Sales",
    designation: "Manager",
    from: "07/4/25",
    to: "07/12/25",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "0987654321",
    department: "Sales",
    designation: "BD",
    from: "07/4/25",
    to: "07/17/25",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "0987654321",
    department: "Sales",
    designation: "Manager",
    from: "07/4/25",
    to: "07/20/25",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "0987654321",
    department: "Sales",
    designation: "BD",
    from: "07/4/25",
    to: "07/18/25",
  },
];

const LeaveApplication = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");

  const filteredData = leaveData.filter((item) => {
    const combinedValues = Object.values(item).join(" ").toLowerCase();
    return combinedValues.includes(searchText.toLowerCase());
  });

  const visibleData = filteredData.slice(0, itemsPerPage);

  return (
    <div className="leave-page">
      <div className="leave-header">
        <h2>Leave Application</h2>
        <div className="leave-actions">
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search here..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="search-btn"
              onClick={() => setSearchText(searchText)}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="leave-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>CONTACT NO.</th>
              <th>DEPARTMENT</th>
              <th>DESIGNATION</th>
              <th>FROM</th>
              <th>TO</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>
                  <span className="email-chip">{item.email}</span>
                </td>
                <td>{item.contact}</td>
                <td>{item.department}</td>
                <td>{item.designation}</td>
                <td>{item.from}</td>
                <td>{item.to}</td>
                <td>
                  <div className="action-buttons">
                    <button className="approve-btn">Approve</button>
                    <button className="decline-btn">Decline</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>Show</span>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        <span>per page</span>
      </div>
    </div>
  );
};

export default LeaveApplication;
