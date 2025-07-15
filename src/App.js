import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgotpassword";
import ChangePass from "./pages/changePass";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePass />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/files" element={<Dashboard />} />
        <Route path="/dashboard/files/:cardName" element={<Dashboard />} />
        <Route path="/dashboard/travel" element={<Dashboard />} />
        <Route path="/dashboard/leave-application" element={<Dashboard />} />
        <Route path="/dashboard/logs" element={<Dashboard />} />
        <Route path="/dashboard/roles" element={<Dashboard />} />
        <Route path="/dashboard/request" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
