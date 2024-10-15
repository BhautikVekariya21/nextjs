"use client";

import axios from "axios";
import React, { useState } from "react";
import dynamic from "next/dynamic";

// ForgotPasswordPage Component
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  // Handle form submission for forgot password
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Make a request to the forgot password API
      const response = await axios.post("/api/users/forgotpassword", { email });
      setMessage(response.data.message);
      setError(false);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setMessage(err.response.data.message || "Failed to send reset password link.");
      } else {
        setMessage("Failed to send reset password link.");
      }
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Forgot Password</h1>
      <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send Reset Link
        </button>
      </form>
      {message && (
        <p className={`${error ? "text-red-500" : "text-green-500"} mt-4`}>
          {message}
        </p>
      )}
    </div>
  );
};

// Use dynamic import to disable SSR
export default dynamic(() => Promise.resolve(ForgotPasswordPage), { ssr: false });
