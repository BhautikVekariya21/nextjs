"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast, Toaster } from "react-hot-toast";

interface User {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState<User>({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);

      // Show success toast notification
      toast.success("Login successful!");
      router.push("/profile");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("Login failed", (error as AxiosError).message);
        toast.error((error as AxiosError).message);
      } else {
        console.error("An unexpected error occurred", error);
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
      {/* Toaster to show notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md border border-gray-300">
        <h1 className="text-2xl font-semibold text-center mb-6 text-indigo-600">
          {loading ? "Processing..." : "Login"}
        </h1>
        <hr className="mb-6" />

        <label htmlFor="email" className="block text-gray-700 mb-2">
          Email
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
        />

        <label htmlFor="password" className="block text-gray-700 mb-2">
          Password
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />

        <button
          onClick={onLogin}
          disabled={buttonDisabled}
          className={`w-full p-3 rounded-lg text-white ${
            buttonDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          } transition duration-300 ease-in-out mb-4`}
        >
          {loading ? "Processing..." : "Login"}
        </button>

        <div className="text-center">
          <Link href="/signup" className="text-indigo-600 hover:text-indigo-800 underline">
            Visit Signup page
          </Link>
        </div>
      </div>
    </div>
  );
}
