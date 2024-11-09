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
    <div className="h-screen flex">
      <div className="lg:flex w-full lg:w-1/2 login_img_section justify-around items-center">
        <div className="bg-black opacity-20 inset-0 z-0"></div>
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 className="text-white font-bold text-4xl font-sans">Simple App</h1>
          <p className="text-white mt-1">The simplest app to use</p>
          <div className="flex justify-center lg:justify-start mt-6">
            <a href="#" className="bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">
              Get Started
            </a>
          </div>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form onSubmit={handleSubmit} className="bg-white rounded-md shadow-2xl p-5">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
            <p className="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="pl-2 w-full outline-none border-none"
              />
            </div>
            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="pl-2 w-full outline-none border-none"
              />
            </div>
            <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl text-white font-semibold mb-2">
              Login
            </button>
            <div className="flex justify-between mt-4">
              <span className="text-sm ml-2 cursor-pointer">Forgot Password?</span>
              <a href="/register" className="text-sm ml-2 cursor-pointer">Don't have an account yet?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}