// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/login";
// import ForgotPassword from "./pages/forgotpassword";
// import ChangePass from "./pages/changePass";
// import Dashboard from "./pages/Dashboard";
// import TravelApplicationForm from "./pages/travel-application-apply";
// import LeaveApplicationForm from "./pages/Leave-application-apply";
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/change-password" element={<ChangePass />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/dashboard/files" element={<Dashboard />} />
//         <Route path="/dashboard/files/:cardName" element={<Dashboard />} />
//         <Route path="/dashboard/travel" element={<Dashboard />} />
//         <Route path="/dashboard/leave-application" element={<Dashboard />} />
//         <Route path="/dashboard/logs" element={<Dashboard />} />
//         <Route path="/dashboard/roles" element={<Dashboard />} />
//         <Route path="/dashboard/request" element={<Dashboard />} />
//         <Route
//           path="/travel-application-apply"
//           element={<TravelApplicationForm />}
//         />
//         <Route
//           path="/leave-application-apply"
//           element={<LeaveApplicationForm />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

/*updated code*/

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgotpassword";
import ChangePass from "./pages/changePass";
import Dashboard from "./pages/Dashboard";
import TravelApplicationForm from "./pages/travel-application-apply";
import LeaveApplicationForm from "./pages/Leave-application-apply";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ import
import EditFileModel from "./pages/EditFileModal";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePass />} />
        <Route path="/edit-file" element={<EditFileModel />} />
        <Route
          path="/travel-application-apply"
          element={<TravelApplicationForm />}
        />
        <Route
          path="/leave-application-apply"
          element={<LeaveApplicationForm />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/files"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/dashboard/files/:cardName"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/dashboard/files/:companyId"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/files/:companyId/:folderId"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/travel"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/leave-application"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/logs"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/roles"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/request"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
