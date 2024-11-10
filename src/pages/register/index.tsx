"use client";
import { useState } from 'react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    age: "",
    address: "",
    phone: "",
    firstName: "",
    lastName: "",
    city: "",
    country: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("User registered successfully!");
        setFormData({
          email: "",
          password: "",
          age: "",
          address: "",
          phone: "",
          firstName: "",
          lastName: "",
          city: "",
          country: ""
        });
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Left section: Image & description */}
      <div className="lg:flex w-full lg:w-1/2 bg-gradient-to-tl from-indigo-600 to-purple-800 text-white flex justify-center items-center py-20 px-8 lg:px-20">
        <div className="text-left w-full lg:w-3/4">
          <h1 className="text-3xl md:text-4xl font-bold">Volt Bank</h1>
          <p className="mt-2 text-sm md:text-base">
          Empowering Your Digital Financial Future.
          </p>
        </div>
      </div>

      {/* Right section: Registration form */}
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white py-8 px-6 sm:px-12 lg:px-24">
        <div className="w-full max-w-md">
          <form className="bg-white rounded-md shadow-2xl p-6 md:p-8" onSubmit={handleSubmit}>
            <h1 className="text-gray-800 font-bold text-2xl mb-4">Welcome to Volt Bank!</h1>
            <p className="text-sm font-normal text-gray-600 mb-6">Create an account</p>

            {/* Email input */}
            <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
              <input
                className="pl-2 w-full outline-none border-none"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password input */}
            <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
              <input
                className="pl-2 w-full outline-none border-none"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* First name input */}
            <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
              <input
                className="pl-2 w-full outline-none border-none"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Last name input */}
            <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
              <input
                className="pl-2 w-full outline-none border-none"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address input */}
            <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
              <input
                className="pl-2 w-full outline-none border-none"
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            {/* City input */}
            <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
              <input
                className="pl-2 w-full outline-none border-none"
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            {/* Country input */}
            <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
              <input
                className="pl-2 w-full outline-none border-none"
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone input */}
            <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
              <input
                className="pl-2 w-full outline-none border-none"
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Birth date input */}
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <input
                className="pl-2 w-full outline-none border-none"
                type="date"
                name="age"
                placeholder="Birth Date"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit button */}
            <button className="bg-indigo-800 text-white w-full py-2 rounded-2xl" type="submit">
              Register
            </button>
            <div className="flex justify-between mt-4 text-sm">
              <a href="/login" className="cursor-pointer text-indigo-600">Already have an account?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
