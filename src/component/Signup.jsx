import React, { useState } from 'react';

import API from './API';
import { toast, ToastContainer } from 'react-toastify';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [user, setUser] = useState({
    name: '', email: '', password: '', department: '', salary: ''
  });
    const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // const handleChange = (e) => {
  //   setUser({ ...user, [e.target.name]: e.target.value });
  // };

  const getPasswordStrength = () => {
    const { password } = user;
    if (password.length < 6) return 'Weak';
    if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[\W]/.test(password)) return 'Strong';
    return 'Medium';
  };

  const passwordStrength = getPasswordStrength();
  const strengthColor = passwordStrength === 'Strong' ? 'green' : passwordStrength === 'Medium' ? 'orange' : 'red';
 const validateField = (name, value) => {
    let message = "";
    switch (name) {
      case "name":
        if (!value.trim()) message = "Name is required";
        break;
      case "email":
        if (!value) {
          message = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          message = "Invalid email format";
        }
        break;
      case "password":
        if (!value) {
          message = "Password is required";
        } else if (value.length < 6) {
          message = "Password must be at least 6 characters";
        }
        break;
      case "department":
        if (!value.trim()) message = "Department is required";
        break;
      case "salary":
        if (!value) {
          message = "Salary is required";
        } else if (isNaN(value) || Number(value) < 0) {
          message = "Salary must be a valid positive number";
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateForm = () => {
    const fieldNames = Object.keys(user);
    let isValid = true;

    fieldNames.forEach((field) => {
      validateField(field, user[field]);
      if (user[field] === '' || errors[field]) {
        isValid = false;
      }
    });

    return isValid;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();


     if (!validateForm()) return;

    setSubmitting(true);
    try {
      await API.post('/register', user);
      toast.success('Signup successful!');
      setUser({ name: '', email: '', password: '', department: '', salary: '' });
      setErrors({});
    } catch (error) {
      const msg = error.response?.data || "Signup failed. Try again.";
      toast.error(msg);
      setUser({ name: '', email: '', password: '', department: '', salary: '' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { email, displayName } = result.user;
      const newUser = {
        name: displayName,
        email,
        password: email,
        department: "General",
        salary: 0
      };
      await API.post('/register', newUser);
      toast.success("Google signup successful!");
    } catch (error) {
      const msg = error.response?.data || "Google signup failed.";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange}
           className={`w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : ''
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

          <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange}
            className={`w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : ''
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

        <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : ''
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-sm text-gray-600"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          {user.password && !errors.password && (
            <div className="text-sm mt-1">
              <span className={`font-medium text-${strengthColor}-600`}>
                Strength: {passwordStrength}
              </span>
            </div>
          )}

          <input type="text" name="department" placeholder="Department" value={user.department} onChange={handleChange}
           className={`w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 ${
              errors.department ? 'border-red-500' : ''
            }`}
          />
          {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}

          <input type="number" name="salary" placeholder="Salary" value={user.salary} onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500" required />

          <button type="submit" disabled={submitting}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            {submitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Google Signup */}
        <div className="text-center mt-4">
          <p className="text-gray-500">or</p>
          <button
            onClick={handleGoogleSignup}
            className="w-full mt-3 border flex items-center justify-center gap-2 text-gray-700 border-gray-300 rounded py-2 hover:bg-gray-100">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
           <Link
                      to="/login"
                      className="text-indigo-600 hover:underline hover:text-indigo-800 font-medium"
                    >
                     Login here
                    </Link>
         
        </p>
      </div>
    </div>
  );
};

export default Signup;
