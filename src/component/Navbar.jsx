import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { auth, logout } = useAuth(); // ✅ use context

  const handleLogout = () => {
    logout(); // ✅ clear localStorage + state
     navigate("/login");
 
  };

  const renderLinks = () => {
    if (!auth.token) {
      return (
        <>
          <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-blue-300">
            Login
          </Link>
          <Link to="/signup" onClick={() => setMenuOpen(false)} className="hover:text-blue-300">
            Signup
          </Link>
        </>
      );
    }

    if (auth.role === "ROLE_EMPLOYEE") {
      return (
        <>
          <Link to="/employee-dashboard" onClick={() => setMenuOpen(false)} className="hover:text-blue-300">
            Employee Dashboard
          </Link>
          <button onClick={handleLogout} className="bg-blue-800 px-3 py-1 rounded hover:bg-blue-900">
            Logout
          </button>
        </>
      );
    }

    if (auth.role === "ROLE_ADMIN") {
      return (
        <>
          <Link to="/admin-dashboard" onClick={() => setMenuOpen(false)} className="hover:text-blue-300">
            Admin Dashboard
          </Link>
          <button onClick={handleLogout} className="bg-blue-800 px-3 py-1 rounded hover:bg-blue-900">
            Logout
          </button>
        </>
      );
    }
  };

  return (
    <nav className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold hover:text-blue-200">MyApp</Link>
          <div className="flex md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-500"
            >
              {menuOpen ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">{renderLinks()}</div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-2 pt-2 pb-3 space-y-1">
          {renderLinks()}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
