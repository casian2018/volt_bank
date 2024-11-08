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
    <div className="h-screen flex">
      <div className="lg:flex w-full lg:w-1/2 login_img_section justify-around items-center">
        <div className="bg-black opacity-20 inset-0 z-0"></div>
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 className="text-white font-bold text-4xl font-sans">Volt Bank</h1>
          <p className="text-white mt-1">Volt Bank is a digital bank offering streamlined accounts, smart financial tools, and fast online banking for easy money management.</p>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form className="bg-white rounded-md shadow-2xl p-5" onSubmit={handleSubmit}>
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Welcome to Volt Bank!</h1>
            <p className="text-sm font-normal text-gray-600 mb-8">Create an account</p>

            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
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

            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
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

            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
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

            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
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

            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
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

            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
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

            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
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

            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
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

            <button className="bg-indigo-800 text-white w-full py-2 rounded-2xl" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
