"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    // Safely extract the token from the router query, handle undefined cases
    const urlToken = router.query.token;
    if (typeof urlToken === "string") {
      setToken(urlToken);
    }
  }, [router.query]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError(true);
      setMessage("Token is missing.");
      return;
    }
    try {
      const response = await axios.post("/api/users/resetpassword", {
        token,
        newPassword,
      });
      setMessage(response.data.message);
      setError(false);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setMessage(err.response.data.message || "Failed to reset password.");
      } else {
        setMessage("Failed to reset password.");
      }
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Reset Password</h1>
      <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reset Password
        </button>
      </form>
      {message && (
        <p className={`${error ? "text-red-500" : "text-green-500"} mt-4`}>
          {message}
        </p>
      )}
    </div>
  );
}
