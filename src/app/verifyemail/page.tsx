"use client";

import axios, { AxiosError } from "axios";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";

// Define types for the component state
type VerifyEmailResponse = {
  message: string;
  success: boolean;
};

export default function VerifyEmailPage() {
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const verifyUserEmail = useCallback(async () => {
    try {
      const response = await axios.post<VerifyEmailResponse>('/api/users/verifyemail', { token });
      console.log(response);
      setVerified(true);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "An error occurred while verifying the email.");
      } else {
        setError("An unexpected error occurred.");
      }
      console.log(err);
    }
  }, [token]);  // Use 'token' as dependency

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token, verifyUserEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Verify Your Email</h1>
        <p className="text-gray-500 mb-6">
          {token ? "Verifying your email, please wait..." : "No token found."}
        </p>

        {verified && (
          <div className="p-4 bg-green-100 text-green-800 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold">Email Verified Successfully!</h2>
            <Link href="/login">
              <a className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Proceed to Login
              </a>
            </Link>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-100 text-red-800 rounded-md shadow-md mt-4">
            <h2 className="text-2xl font-semibold">Error in Email Verification</h2>
            <p className="text-sm mt-2">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
