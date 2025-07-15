import React, { useState, useEffect, useRef } from "react";
import "../styles/LeaveApplication.css";
import { VscSettings } from "react-icons/vsc";

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
    designation: "BD",
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
    designation: "BD",
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
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterDates, setFilterDates] = useState({ from: "", to: "" });
  const [filteredData, setFilteredData] = useState(leaveData);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applyFilter = () => {
    if (!filterDates.from && !filterDates.to) {
      setFilteredData(leaveData);
      return;
    }

    const fromDate = filterDates.from ? new Date(filterDates.from) : null;
    const toDate = filterDates.to ? new Date(filterDates.to) : null;

    const result = leaveData.filter((item) => {
      const leaveFrom = new Date(item.from);
      return (
        (!fromDate || leaveFrom >= fromDate) && (!toDate || leaveFrom <= toDate)
      );
    });

    setFilteredData(result);
    setFilterOpen(false);
  };

  const visibleData = filteredData.slice(0, itemsPerPage);

  return (
    <div className="leave-page">
      <div className="leave-header">
        <h2>Leave Application</h2>
        <div className="filter-container" ref={filterRef}>
          <button
            className="filter-btn"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <VscSettings /> Filters
          </button>

          {filterOpen && (
            <div className="filter-popup">
              <h4>Date Range</h4>
              <hr />
              <label>From:</label>
              <input
                type="date"
                value={filterDates.from}
                onChange={(e) =>
                  setFilterDates((prev) => ({ ...prev, from: e.target.value }))
                }
              />
              <label>To:</label>
              <input
                type="date"
                value={filterDates.to}
                onChange={(e) =>
                  setFilterDates((prev) => ({ ...prev, to: e.target.value }))
                }
              />
              <button className="apply-btn" onClick={applyFilter}>
                Apply
              </button>
            </div>
          )}
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
              <th>From</th>
              <th>To</th>
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
