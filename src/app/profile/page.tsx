"use client";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<string>("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error((error as AxiosError).message);
      } else {
        console.error("An unexpected error occurred", error);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error("Failed to fetch user details.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
      {/* Toaster for notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md border border-gray-300">
        <h1 className="text-3xl font-bold text-center mb-4 text-indigo-600">Profile Page</h1>
        <hr className="mb-6" />

        <p className="text-center text-lg text-gray-700 mb-4">Welcome to your profile!</p>

        <h2 className="text-center text-xl font-semibold p-2 mb-6 rounded-lg bg-green-500 text-white">
          {data === "nothing" ? (
            "No User Details"
          ) : (
            <Link href={`/profile/${data}`} className="hover:underline">
              {data}
            </Link>
          )}
        </h2>

        <div className="space-y-4">
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Logout
          </button>

          <button
            onClick={getUserDetails}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Get User Details
          </button>
        </div>
      </div>
    </div>
  );
}
