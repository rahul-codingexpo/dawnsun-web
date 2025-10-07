// import React, { useState } from "react";
// import "../styles/LeaveApplication.css";

// const leaveData = [
//   {
//     name: "Christine Brooks",
//     email: "christinebrooks@5.com",
//     contact: "0987654321",
//     department: "Sales",
//     designation: "BD",
//     from: "07/4/25",
//     to: "07/6/25",
//   },
//   {
//     name: "Christine Brooks",
//     email: "christinebrooks@5.com",
//     contact: "0987654321",
//     department: "Sales",
//     designation: "BD",
//     from: "07/4/25",
//     to: "07/9/25",
//   },
//   {
//     name: "Christine Brooks",
//     email: "christinebrooks@5.com",
//     contact: "0987654321",
//     department: "Sales",
//     designation: "BD",
//     from: "07/4/25",
//     to: "07/10/25",
//   },
//   {
//     name: "Christine Brooks",
//     email: "christinebrooks@5.com",
//     contact: "0987654321",
//     department: "Sales",
//     designation: "BD",
//     from: "07/4/25",
//     to: "07/15/25",
//   },
//   {
//     name: "Christine Brooks",
//     email: "christinebrooks@5.com",
//     contact: "0987654321",
//     department: "Sales",
//     designation: "Manager",
//     from: "07/4/25",
//     to: "07/12/25",
//   },
//   {
//     name: "Christine Brooks",
//     email: "christinebrooks@5.com",
//     contact: "0987654321",
//     department: "Sales",
//     designation: "BD",
//     from: "07/4/25",
//     to: "07/17/25",
//   },
//   {
//     name: "Christine Brooks",
//     email: "christinebrooks@5.com",
//     contact: "0987654321",
//     department: "Sales",
//     designation: "Manager",
//     from: "07/4/25",
//     to: "07/20/25",
//   },
//   {
//     name: "Christine Brooks",
//     email: "christinebrooks@5.com",
//     contact: "0987654321",
//     department: "Sales",
//     designation: "BD",
//     from: "07/4/25",
//     to: "07/18/25",
//   },
// ];

// const LeaveApplication = () => {
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [searchText, setSearchText] = useState("");

//   const filteredData = leaveData.filter((item) => {
//     const combinedValues = Object.values(item).join(" ").toLowerCase();
//     return combinedValues.includes(searchText.toLowerCase());
//   });

//   const visibleData = filteredData.slice(0, itemsPerPage);

//   return (
//     <div className="leave-page">
//       <div className="leave-header">
//         <h2>Leave Application</h2>
//         <div className="leave-actions">
//           <div className="search-wrapper">
//             <input
//               type="text"
//               className="search-input"
//               placeholder="Search here..."
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//             <button
//               className="search-btn"
//               onClick={() => setSearchText(searchText)}
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="table-wrapper">
//         <table className="leave-table">
//           <thead>
//             <tr>
//               <th>NAME</th>
//               <th>EMAIL</th>
//               <th>CONTACT NO.</th>
//               <th>DEPARTMENT</th>
//               <th>DESIGNATION</th>
//               <th>FROM</th>
//               <th>TO</th>
//               <th>ACTION</th>
//             </tr>
//           </thead>
//           <tbody>
//             {visibleData.map((item, idx) => (
//               <tr key={idx}>
//                 <td>{item.name}</td>
//                 <td>
//                   <span className="email-chip">{item.email}</span>
//                 </td>
//                 <td>{item.contact}</td>
//                 <td>{item.department}</td>
//                 <td>{item.designation}</td>
//                 <td>{item.from}</td>
//                 <td>{item.to}</td>
//                 <td>
//                   <div className="action-buttons">
//                     <button className="approve-btn">Approve</button>
//                     <button className="decline-btn">Decline</button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="pagination">
//         <span>Show</span>
//         <select
//           value={itemsPerPage}
//           onChange={(e) => setItemsPerPage(Number(e.target.value))}
//         >
//           <option value="1">1</option>
//           <option value="5">5</option>
//           <option value="10">10</option>
//         </select>
//         <span>per page</span>
//       </div>
//     </div>
//   );
// };

// export default LeaveApplication;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/LeaveApplication.css"; // Use the external CSS you already have

export default function LeaveApplications() {
  const [leaves, setLeaves] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leaves", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/leaves/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchLeaves(); // Refresh after status change
    } catch (err) {
      console.error(err);
    }
  };

  // Filter search
  const filteredLeaves = leaves.filter((leave) => {
    const combinedValues = Object.values(leave).join(" ").toLowerCase();
    return combinedValues.includes(searchText.toLowerCase());
  });

  const visibleLeaves = filteredLeaves.slice(0, itemsPerPage);

  return (
    <div className="leave-page">
      <div className="leave-header">
        <h2>Leave Applications</h2>
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
              <th>HOD</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {visibleLeaves.map((leave) => (
              <tr key={leave._id}>
                <td>{leave.name}</td>
                <td>
                  <span className="email-chip">{leave.email}</span>
                </td>
                <td>{leave.contact}</td>
                <td>{leave.department}</td>
                <td>{leave.designation}</td>
                <td>{new Date(leave.fromDate).toLocaleDateString()}</td>
                <td>{new Date(leave.toDate).toLocaleDateString()}</td>
                <td>{leave.hod}</td>
                <td>{leave.status}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="approve-btn"
                      onClick={() => updateStatus(leave._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="decline-btn"
                      onClick={() => updateStatus(leave._id, "Denied")}
                    >
                      Decline
                    </button>
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
}
