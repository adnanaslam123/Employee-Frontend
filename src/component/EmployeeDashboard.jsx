import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";



const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:8080/employee/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEmployee(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  const handleEdit = (id) => {
    // ✅ navigate to edit page with employee ID
    navigate(`/employee/edit`);
   //  navigate(`/admin/employees/edit/${id}`);
  };

const confirmDelete = async () => {
  try {
    await axios.delete(`http://localhost:8080/employee/delete`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Account deleted successfully");
     localStorage.clear();
     logout();
    navigate("/login");
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete account");
  } finally {
    setShowModal(false);
  }
};


  if (!token) return <p className="text-center mt-8 text-red-600">Please login first</p>;
  if (!employee) return <p className="text-center mt-8">Loading...</p>;

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Employee Dashboard</h2>

        <div className="flex justify-end gap-4 mb-4">
          <button
          //  onClick={() => handleEdit(employee.id)}
             onClick={handleEdit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            ✏️ Edit Account
          </button>
         <button
  onClick={() => setShowModal(true)}
  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
>
  ❌ Delete Account
</button>

        </div>

        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left uppercase font-medium text-sm">ID</th>
                <th className="py-3 px-6 text-left uppercase font-medium text-sm">Name</th>
                <th className="py-3 px-6 text-left uppercase font-medium text-sm">Email</th>
                <th className="py-3 px-6 text-left uppercase font-medium text-sm">Department</th>
                <th className="py-3 px-6 text-left uppercase font-medium text-sm">Salary</th>
                <th className="py-3 px-6 text-left uppercase font-medium text-sm">Password</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b border-gray-200 hover:bg-gray-100 transition duration-200">
                <td className="py-4 px-6">{employee.id}</td>
                <td className="py-4 px-6">{employee.name}</td>
                <td className="py-4 px-6">{employee.email}</td>
                <td className="py-4 px-6">{employee.department}</td>
                <td className="py-4 px-6">{employee.salary}</td>
                <td className="py-4 px-6 flex items-center space-x-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={employee.password}
                    readOnly
                    className="border border-gray-300 rounded px-3 py-1 w-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-blue-600 hover:text-blue-800 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7a10.033 10.033 0 012.98-3.768M3 3l18 18M10.542 10.542a3 3 0 014.242 4.242" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 01-3 3m0-6a3 3 0 013 3" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1.458 12C2.732 7.943 6.473 5 12 5c5.527 0 9.268 2.943 10.542 7-1.274 4.057-5.015 7-10.542 7-5.527 0-9.268-2.943-10.542-7z" />
                        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
 <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">

    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Confirm Deletion</h3>
      <p className="text-gray-600 mb-6">Are you sure you want to delete your account? This action is permanent.</p>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={confirmDelete}
          className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default EmployeeDashboard;
