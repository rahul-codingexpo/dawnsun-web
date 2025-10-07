// import React, { useState, useEffect, useRef } from "react";
// import "../styles/AddMemberModal.css";

// const AddMemberModal = ({ onClose, onAdd }) => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     mobile: "",
//     department: "",
//     designation: "",
//     role: "",
//     password: "",
//   });

//   const modalRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         onClose();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [onClose]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     onAdd(formData);
//     onClose();
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="add-member-modal" ref={modalRef}>
//         <div className="modal-header">
//           <h3>Add Member</h3>
//           <button className="close-btn" onClick={onClose}>
//             ×
//           </button>
//         </div>

//         <div className="modal-body">
//           <div className="form-group">
//             <label>
//               Full Name <span>*</span>
//             </label>
//             <input
//               name="name"
//               placeholder="Full Name"
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>
//                 Email <span>*</span>
//               </label>
//               <input name="email" placeholder="Email" onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>
//                 Mobile Number <span>*</span>
//               </label>
//               <input
//                 name="mobile"
//                 placeholder="Mobile Number"
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>
//                 Department <span>*</span>
//               </label>
//               <select name="department" onChange={handleChange}>
//                 <option value="">Value</option>
//                 <option value="Sales">Sales</option>
//                 <option value="HR">HR</option>
//                 <option value="IT">IT</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>
//                 Designation <span>*</span>
//               </label>
//               <select name="designation" onChange={handleChange}>
//                 <option value="">Value</option>
//                 <option value="BD">BD</option>
//                 <option value="Manager">Manager</option>
//               </select>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>
//                 Role Type <span>*</span>
//               </label>
//               <select name="role" onChange={handleChange}>
//                 <option value="">Value</option>
//                 <option value="Admin">Admin</option>
//                 <option value="User">User</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Set Password</label>
//               <input
//                 name="password"
//                 placeholder="123***"
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="modal-footer">
//           <button className="cancel-btn" onClick={onClose}>
//             Cancel
//           </button>
//           <button className="add-btn" onClick={handleSubmit}>
//             Add Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddMemberModal;

/*updated code*/

import React, { useState, useEffect, useRef } from "react";
import "../styles/AddMemberModal.css";
import axios from "axios";

const AddMemberModal = ({ onClose, onMemberAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    department: "",
    designation: "",
    role: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const modalRef = useRef(null);

  // close when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/auth/add-member",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess(res.data.message);
      setError("");

      if (onMemberAdded) onMemberAdded(res.data.member);

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add member");
      setSuccess("");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="add-member-modal" ref={modalRef}>
        <div className="modal-header">
          <h3>Add Member</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {error && <p className="error-msg">{error}</p>}
          {success && <p className="success-msg">{success}</p>}

          <div className="form-group">
            <label>
              Full Name <span>*</span>
            </label>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                Email <span>*</span>
              </label>
              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="form-group">
              <label>
                Mobile Number <span>*</span>
              </label>
              <input
                name="contact"
                placeholder="Mobile Number"
                onChange={handleChange}
                value={formData.mobile}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                Department <span>*</span>
              </label>
              <select
                name="department"
                onChange={handleChange}
                value={formData.department}
              >
                <option value="">Select Department</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                Designation <span>*</span>
              </label>
              <select
                name="designation"
                onChange={handleChange}
                value={formData.designation}
              >
                <option value="">Select Designation</option>
                <option value="BD">BD</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                Role Type <span>*</span>
              </label>
              <select name="role" onChange={handleChange} value={formData.role}>
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <div className="form-group">
              <label>Set Password</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="add-btn" onClick={handleSubmit}>
            Add Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
