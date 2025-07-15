import React, { useState, useEffect } from "react";
import "../styles/RolesPage.css";
import AddMemberModal from "./AddMemberModal";
import EditMemberModal from "./EditMemberModal";

const rolesData = [
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    mobile: "1234678900",
    department: "Sales",
    designation: "BD",
    status: "Active",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    mobile: "1234678900",
    department: "Sales",
    designation: "BD",
    status: "Active",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    mobile: "1234678900",
    department: "Sales",
    designation: "BD",
    status: "Active",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    mobile: "1234678900",
    department: "Sales",
    designation: "BD",
    status: "Active",
  },
];

const RolesPage = () => {
  const [data, setData] = useState(rolesData);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [openStatusIndex, setOpenStatusIndex] = useState(null);
  const [openActionIndex, setOpenActionIndex] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const visibleData = data.slice(0, itemsPerPage);

  useEffect(() => {
    const closeDropdowns = (e) => {
      if (!e.target.closest(".dropdown-wrapper")) {
        setOpenStatusIndex(null);
        setOpenActionIndex(null);
      }
    };
    document.addEventListener("mousedown", closeDropdowns);
    return () => document.removeEventListener("mousedown", closeDropdowns);
  }, []);

  const updateStatus = (index, status) => {
    const updated = [...data];
    updated[index].status = status;
    setData(updated);
    setOpenStatusIndex(null);
  };

  return (
    <div className="roles-page">
      <div className="roles-header">
        <h2>Roles</h2>
        <button
          className="add-member-btn"
          onClick={() => setShowAddModal(true)}
        >
          + Add Member
        </button>
      </div>

      <div className="roles-table-wrapper">
        <table className="roles-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>MOBILE NO.</th>
              <th>DEPARTMENT</th>
              <th>DESIGNATION</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>
                  <span className="email-chip">{item.email}</span>
                </td>
                <td>{item.mobile}</td>
                <td>{item.department}</td>
                <td>{item.designation}</td>
                <td>
                  <div className="dropdown-wrapper">
                    <button
                      className={`status-btn ${
                        item.status?.toLowerCase() || "inactive"
                      }`}
                      onClick={() =>
                        setOpenStatusIndex(openStatusIndex === idx ? null : idx)
                      }
                    >
                      {item.status || "inactive"}
                    </button>
                    {openStatusIndex === idx && (
                      <div className="dropdown-options">
                        <button onClick={() => updateStatus(idx, "Active")}>
                          Active
                        </button>
                        <button onClick={() => updateStatus(idx, "Inactive")}>
                          Inactive
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="dropdown-wrapper">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        setOpenActionIndex(openActionIndex === idx ? null : idx)
                      }
                    >
                      Edit ▾
                    </button>

                    {openActionIndex === idx && (
                      <div className="dropdown-options">
                        <button
                          onClick={() => {
                            setEditIndex(idx);
                            setEditModalVisible(true);
                            setOpenActionIndex(null);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            const confirmed = window.confirm(
                              "Are you sure to delete this member?"
                            );
                            if (confirmed) {
                              const updated = [...data];
                              updated.splice(idx, 1);
                              setData(updated);
                            }
                            setOpenActionIndex(null);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editModalVisible && (
        <EditMemberModal
          member={data[editIndex]}
          onClose={() => setEditModalVisible(false)}
          onUpdate={(updatedMember) => {
            const updatedData = [...data];
            updatedData[editIndex] = updatedMember;
            setData(updatedData);
            setEditModalVisible(false);
          }}
        />
      )}
      {showAddModal && (
        <AddMemberModal
          onClose={() => setShowAddModal(false)}
          onAdd={(member) => setData((prev) => [member, ...prev])}
        />
      )}
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

export default RolesPage;
