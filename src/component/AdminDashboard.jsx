import React, { useEffect, useState } from "react";

import API from "./Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; 
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
const [isDeleting, setIsDeleting] = useState(false); 
const [loading, setLoading] = useState(true); 

const { auth } = useAuth();
const token = auth.token;
  const navigate = useNavigate();

  useEffect(() => {
    //  setTimeout(() => toast.success("Admin Dashboard Loaded!"), 100);
    if (!token) return;

    API
      .get("/admin/employees", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false)); 
  }, [token]);

  const handleEdit = (id) => {
    navigate(`/admin/employees/edit/${id}`);
  };


  //confirm delete
// const confirmDelete = async (id) => {
//   try {
//       toast.dismiss(); 
//     await API.delete(`/admin/employees/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     toast.success("Account deleted successfully");
//     setEmployees((prev) => prev.filter((emp) => emp.id !== id));
//   //localStorage.clear();
//     // navigate("/login");
//   } catch (error) {
//     console.error(error);
//     toast.error("Failed to delete account");
//   } finally {
//     setShowModal(false);
//   }
// };
//end

const confirmDelete = async (id) => {
  try {
    setIsDeleting(true);         // Show loading
    toast.dismiss();             // Clear any previous toasts

    await API.delete(`/admin/employees/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("hii");
       setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        toast.success("Employee account deleted successfully");

    // ✅ 2. Now show toast AFTER UI changes

    
  } catch (error) {
    
    toast.error("Failed to delete account");
  } finally {
    setIsDeleting(false);
    setShowModal(false);
  }
};



if (token === null) return <p>Restoring session...</p>;
if (loading) return <p>Loading...</p>;


  return (
    <>
  {/* //  <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2> */}

{employees.length === 0 ? (
  <p className="text-center text-gray-500 mt-6">No employee records found.</p>
) : (
      <div className="dashboard-container p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
              <button
        onClick={() =>
          
          toast.success("Test Toast!")}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Test Toast
      </button>


        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Department</th>
              <th className="border border-gray-300 px-4 py-2">Salary</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{emp.id}</td>
                <td className="border border-gray-300 px-4 py-2">{emp.name}</td>
                <td className="border border-gray-300 px-4 py-2">{emp.email}</td>
                <td className="border border-gray-300 px-4 py-2">{emp.department}</td>
                <td className="border border-gray-300 px-4 py-2">{emp.salary}</td>
                <td className="border border-gray-300 px-4 py-2">{emp.role}</td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(emp.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                       setSelectedId(emp.id); // ✅ Store the ID
    setShowModal(true);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
          )}
                {/* modal section */}
       {/* {showModal && (
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
        onClick={() => confirmDelete(selectedId)}
          className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
)} */}
{/* end modal section */}

{showModal && (
  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Confirm Deletion</h3>
      <p className="text-gray-600 mb-6">
        Are you sure you want to delete this account? This action is permanent.
      </p>

      {isDeleting && (
        <p className="text-sm text-gray-500 mb-4 animate-pulse">Deleting account...</p>
      )}

      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShowModal(false)}
          disabled={isDeleting}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={() => confirmDelete(selectedId)}
          disabled={isDeleting}
          className={`px-4 py-2 rounded ${
            isDeleting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          } text-white`}
        >
          {isDeleting ? "Deleting..." : "Yes, Delete"}
        </button>
      </div>
    </div>
  </div>
)}



    </>
  );
};

export default AdminDashboard;
