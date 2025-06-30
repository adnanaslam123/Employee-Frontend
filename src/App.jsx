import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./component/Login";
import EmployeeDashboard from "./component/EmployeeDashboard";
import AdminDashboard from "./component/AdminDashboard";
import Navbar from "./component/Navbar";
import Signup from "./component/Signup";
import TestConnection from "./TestConnection";
import EditEmployee from "./component/EditEmployee";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EditOwnEmployee from "./component/EditOwnEmployee";
import ForgotPassword from "./component/ForgotPassword";

// 🔒 Reusable ProtectedRoute Component
const ProtectedRoute = ({ roleRequired, children }) => {
  const role = localStorage.getItem("role");
  return role === roleRequired ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/test-connection" element={<TestConnection />} />

        {/* ✅ Protected Routes using wrapper */}
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute roleRequired="ROLE_EMPLOYEE">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute roleRequired="ROLE_ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/employees/edit/:id"
          element={
            <ProtectedRoute roleRequired="ROLE_ADMIN">
              <EditEmployee />
            </ProtectedRoute>
          }
        />

                <Route
          path="/employee/edit"
          element={
            <ProtectedRoute roleRequired="ROLE_EMPLOYEE">
              <EditOwnEmployee />
            </ProtectedRoute>
          }
        />



 <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* ❌ Catch-all for undefined routes */}
        <Route path="*" element={<h1 style={{ textAlign: 'center' }}>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
