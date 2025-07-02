import React, { useEffect, useState } from "react";
import API from "./API";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
    role: "ROLE_EMPLOYEE",
    password: ""
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    API
      .get(`/admin/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEmployee({ ...res.data, password: "" });
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch employee data");
        setLoading(false);
      });
  }, [id, token]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (employee.password && employee.password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setSubmitting(true);
      await API.put(`/admin/update/${id}`, employee, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Employee updated successfully!");

      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 2000); // Redirect after showing spinner
    } catch (err) {
      setSubmitting(false);
      setError("Failed to update employee");
      toast.error("Failed to update employee");
    }
  };

  if (!token) return <p>Please login first</p>;
  if (loading) return <p className="text-center mt-6 text-gray-600">Loading employee data...</p>;

  return (
    <>
      
      {/* <ToastContainer position="top-right" /> */}
      <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-6">
        <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {submitting ? (
          <div className="text-center py-6">
            <div className="flex justify-center items-center gap-2">
              <div className="w-6 h-6 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
              <p className="text-blue-600 font-semibold">Updating employee, please wait...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={employee.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={employee.email}
                disabled
                className="w-full bg-gray-100 cursor-not-allowed border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Department</label>
              <input
                type="text"
                name="department"
                value={employee.department}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Salary</label>
              <input
                type="number"
                name="salary"
                value={employee.salary}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Role</label>
              <select
                name="role"
                value={employee.role}
                  disabled
                onChange={handleChange}
                className="w-full bg-gray-100 cursor-not-allowed border border-gray-300 rounded px-3 py-2"
              >
                <option value="ROLE_EMPLOYEE">Employee</option>
                <option value="ROLE_ADMIN">Admin</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">New Password</label>
              <input
                type="password"
                name="password"
                value={employee.password}
                onChange={handleChange}
                placeholder="Leave blank to keep existing"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Update Employee
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default EditEmployee;
