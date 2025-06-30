import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./AuthContext";

const EditOwnEmployee = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
 const { logout } = useAuth();
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

  // Modal-related state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");

  // Fetch employee data
  useEffect(() => {
    if (!token) return;

    axios
      .get(`http://localhost:8080/employee/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEmployee({ ...res.data, password: "" });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch employee data");
        setLoading(false);
      });
  }, [token]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    setShowPasswordModal(true); // Show password modal
  };

  const handleConfirmUpdate = async () => {
    if (!oldPassword) {
      toast.error("Please enter your old password");
      return;
    }

    try {
      // Step 1: Validate old password
      const res = await axios.post(
        "http://localhost:8080/employee/validate-password",
        { password: oldPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.data.valid) {
        toast.error("Old password is incorrect");
        return;
      }



      // Step 2: Match confirm password
    //   if (employee.password && employee.password !== confirmPassword) {
    //     toast.error("Passwords do not match");
    //     return;
    //   }


          if (employee.password) {
      if (employee.password !== confirmPassword) {
        toast.error("your new Passwords does not match");
        return;
      }
    }

    // ✅ Step 3: Prepare update payload (exclude empty password)
    const updatedEmployee = { ...employee };
    if (!employee.password) {
      delete updatedEmployee.password; // don’t send password if not changing it
    }





      // Step 3: Proceed to update
      setSubmitting(true);
      await axios.put("http://localhost:8080/employee/update", updatedEmployee, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Employee updated successfully!");
      setShowPasswordModal(false);

//step4

    if (employee.password && employee.password.trim() !== "") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      toast.info("Password changed. Please login again.");




    //   setTimeout(() => navigate("/employee-dashboard"), 1500);
    // } 
    // 
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 2000);
    } else {
      setTimeout(() => {
        navigate("/employee-dashboard");
      }, 2000);
    }
  }




     catch (err) {
      toast.error("Failed to update employee");
      setSubmitting(false);
    }
  };

  if (!token) return <p>Please login first</p>;
  if (loading) return <p className="text-center mt-6 text-gray-600">Loading employee data...</p>;

  return (
    <>
      <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-6">
        <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form className="space-y-4">
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
              className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
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

          <div className="flex justify-start gap-4">
            <button
              onClick={handleUpdateClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Update Employee
            </button>
            <button
              type="button"
              onClick={() => navigate("/employee-dashboard")}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* 🔒 Password Confirmation Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Confirm with Old Password</h3>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
              className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
            />
            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={handleConfirmUpdate}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditOwnEmployee;
