"use client";
import React from "react";
import { Toaster, toast } from "react-hot-toast";

interface Params {
  id: string;
}

export default function UserProfile({ params }: { params: Params }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
      {/* Toaster to show notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg border border-gray-300 text-center">
        <h1 className="text-3xl font-semibold text-black mb-6">Profile</h1>
        <hr className="mb-6" />

        <p className="text-4xl font-semibold mb-4 text-black">
          Profile Page
          <span className="p-2 ml-2 rounded bg-orange-500 text-black">
            {params.id}
          </span>
        </p>

        <button
          onClick={() => toast.success("Welcome to your profile!")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Show Toast
        </button>
      </div>
    </div>
  );
}
