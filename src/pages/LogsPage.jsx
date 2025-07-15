import React, { useState } from "react";
import "../styles/LogsPage.css";

const logsData = [
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    department: "Sales",
    ip: "1234678900",
    dateTime: "2-JUN-2025, 10:00 am",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    department: "Sales",
    ip: "1234678900",
    dateTime: "2-JUN-2025, 10:00 am",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    department: "Sales",
    ip: "1234678900",
    dateTime: "2-JUN-2025, 10:00 am",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    department: "Sales",
    ip: "1234678900",
    dateTime: "2-JUN-2025, 10:00 am",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    department: "Sales",
    ip: "1234678900",
    dateTime: "2-JUN-2025, 10:00 am",
  },
];

const LogsPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(1);

  const visibleData = logsData.slice(0, itemsPerPage);

  return (
    <div className="logs-page">
      <h2 className="logs-heading">Logs</h2>
      <div className="logs-table-wrapper">
        <table className="logs-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>DEPARTMENT</th>
              <th>IP ADDRESS</th>
              <th>DATE & TIME</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>
                  <span className="email-chip">{item.email}</span>
                </td>
                <td>{item.department}</td>
                <td>{item.ip}</td>
                <td>{item.dateTime}</td>
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
          <option value="2">2</option>
          <option value="5">5</option>
        </select>
        <span>per page</span>
      </div>
    </div>
  );
};

export default LogsPage;
