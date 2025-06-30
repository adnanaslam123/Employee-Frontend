import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate =useNavigate();

  const sendOtp = async () => {
    try {
      await axios.post("http://localhost:8080/auth/send-otp", { email });
      toast.success("OTP sent to your email");
      setStep(2);
    } catch {
      toast.error("Email not registered or failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post("http://localhost:8080/auth/verify-otp", { email, otp });
      toast.success("OTP verified, now set new password");
      setStep(3);
    } catch {
      toast.error("Invalid or expired OTP");
    }
  };

  const resetPassword = async () => {
    try {
      await axios.post("http://localhost:8080/auth/reset-password", {
        email,
        password: newPassword,
      });
      toast.success("Password updated successfully. Please login.");

      setStep(1);
        setTimeout(() => {
      navigate("/login"); // ✅ Redirect to login page
    }, 900);
      setEmail("");
      setOtp("");
      setNewPassword("");
    } catch {
      toast.error("Failed to reset password");
            setEmail("");
      setOtp("");
      setNewPassword("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>

      {step === 1 && (
        <>
          <input
            type="email"
            className="w-full border px-3 py-2 mb-4"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            onClick={sendOtp}
          >
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            className="w-full border px-3 py-2 mb-4"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
            onClick={verifyOtp}
          >
            Verify OTP
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <input
            type="password"
            className="w-full border px-3 py-2 mb-4"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded w-full"
            onClick={resetPassword}
          >
            Reset Password
          </button>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
