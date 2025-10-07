import React, { useState, useEffect } from "react";
import "../styles/LogsPage.css";
import axios from "axios";

const LogsPage = () => {
  const [logsData, setLogsData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // useEffect(() => {
  //   const fetchLogs = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const { data } = await axios.get("/api/logs", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setLogsData(data);
  //     } catch (err) {
  //       console.error("Error fetching logs:", err);
  //     }
  //   };
  //   fetchLogs();
  // }, []);
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/logs", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setLogsData(data);
      } catch (err) {
        console.error("Failed to fetch logs", err);
      }
    };
    fetchLogs();
  }, []);

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
                <td>{new Date(item.dateTime).toLocaleString()}</td>
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
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        <span>per page</span>
      </div>
    </div>
  );
};

export default LogsPage;
