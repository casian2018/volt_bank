"use client";

import { useEffect, useState } from 'react';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  age: number;
  balance: number;
  savings: number;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch the email from email.txt via the getEmail API
        const emailResponse = await fetch('/api/getEmail');
        if (!emailResponse.ok) {
          throw new Error('Could not retrieve email');
        }
        const emailData = await emailResponse.text(); // Expecting plain text

        if (!emailData) {
          throw new Error('Email not found in the file');
        }

        // Use the fetched email to get the user data
        const response = await fetch(`/api/getUser?email=${emailData.trim()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok && data.user) {
          setUser(data.user);
        } else {
          throw new Error('User not found');
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <main className="container mx-w-6xl mx-auto py-4">
      <div className="flex flex-col space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 px-4 xl:p-0 gap-y-4 md:gap-6">
          <div className="md:col-span-2 xl:col-span-3 bg-white p-6 rounded-2xl border border-gray-50">
            <div className="flex flex-col space-y-6 md:h-full md:justify-between">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  Main Account
                </span>
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  Available Funds
                </span>
              </div>
              <div className="flex gap-2 md:gap-4 justify-between items-center">
                <div className="flex flex-col space-y-4">
                  <h2 className="text-gray-800 font-bold tracking-widest leading-tight">{user?.firstName}'s Savings Account</h2>
                  <div className="flex items-center gap-4">
                    <p className="text-lg text-gray-600 tracking-wider">**** **** *321</p>
                  </div>
                </div>
                <h2 className="text-lg md:text-xl xl:text-3xl text-gray-700 font-black tracking-wider">
                  <span className="md:text-xl">$</span>
                  {user?.balance.toFixed(2)}
                </h2>
              </div>
              <div className="flex gap-2 md:gap-4">
                <a href="#"
                  className="bg-blue-600 px-5 py-3 w-full text-center md:w-auto rounded-lg text-white text-xs tracking-wider font-semibold hover:bg-blue-800">
                  Transfer Money
                </a>
                <a href="#"
                  className="bg-blue-50 px-5 py-3 w-full text-center md:w-auto rounded-lg text-blue-600 text-xs tracking-wider font-semibold hover:bg-blue-600 hover:text-white">
                  Link Account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
