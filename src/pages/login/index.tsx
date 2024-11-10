"use client";

import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/profile"); // Redirect after login
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Left section: Image & description */}
      <div className="lg:flex w-full lg:w-1/2 bg-gradient-to-tl from-indigo-600 to-purple-800 text-white flex justify-center items-center py-20 px-8 lg:px-20">
        <div className="text-left w-full lg:w-3/4"> {/* Alinierea textului la stânga */}
          <h1 className="text-3xl md:text-4xl font-bold">Volt Bank</h1>
          <p className="mt-2  text-sm md:text-base">
          Empowering Your Digital Financial Future.
          </p>
        </div>
      </div>

      {/* Right section: Login form */}
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white py-8 px-6 sm:px-12 lg:px-24">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="bg-white rounded-md shadow-2xl p-6 md:p-8 ">
            <h1 className="text-gray-800 font-bold text-2xl mb-4">Hello Again!</h1>
            <p className="text-sm font-normal text-gray-600 mb-6">Welcome Back</p>

            {/* Email input */}
            <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="pl-2 w-full outline-none border-none"
              />
            </div>

            {/* Password input */}
            <div className="flex items-center border-2 mb-6 py-2 px-3 rounded-2xl">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="pl-2 w-full outline-none border-none"
              />
            </div>

            {/* Submit button */}
            <button type="submit" className="block w-full bg-indigo-600 py-2 rounded-2xl text-white font-semibold mb-4">
              Login
            </button>

            {/* Forgot password and register links */}
            <div className="flex justify-between mt-4 text-sm">
              <span className="cursor-pointer text-indigo-600">Forgot Password?</span>
              <a href="/register" className="cursor-pointer text-indigo-600">Don't have an account yet?</a>
            </div>
          </form>
          
        </div>
        
      </div>
      </div>
  );
}
