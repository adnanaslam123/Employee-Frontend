import React, { useState, useEffect } from "react";
// import axios from "axios";
import API from "./Api";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();


  // ✅ Prevent already logged-in users from accessing login
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role === "ROLE_ADMIN") {
      navigate("/admin-dashboard");
    } else if (token && role === "ROLE_EMPLOYEE") {
      navigate("/employee-dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", credentials);
      // const response = await axios.post("/auth/login", credentials);
      const { token, role, email, name } = response.data;
       login({ token, role, email, name });

      // ✅ Store immediately
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);

      toast.success("Login successful!");

      // ✅ Use role from response (don't wait for localStorage)
      if (role === "ROLE_ADMIN") {
        navigate("/admin-dashboard", { replace: true });
      } else if (role === "ROLE_EMPLOYEE") {
        navigate("/employee-dashboard", { replace: true });
      } else {
        setError("Unknown user role");
      }

    } catch (err) {
      setCredentials({ email: "", password: "" });
      setError("Login failed. Check your email and password.");
      toast.error("Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200">
      {/* <ToastContainer /> */}
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">Login</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              autoFocus
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md font-semibold transition duration-200 ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:underline hover:text-indigo-800 font-medium"
          >
            Sign up here
          </Link>
        </p>
        <p className="text-sm text-blue-500 mt-2">
  <a href="/forgot-password">Forgot Password?</a>
</p>

      </div>
    </div>
  );
};

export default Login;
