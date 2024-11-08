"use client";

import { useEffect, useState } from 'react';

export default function ProfilePage() {
  interface User {
    firstName: string;
    balance: number;
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from API on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/userProfile');
        const data = await res.json();
        
        if (res.ok) {
          setUser(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display user data
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-lg md:text-xl xl:text-3xl text-gray-700 font-black tracking-wider">
                  <span className="md:text-xl">$</span>
                  {user ? user.balance.toFixed(2) : '0.00'}
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
          <div className="col-span-2 p-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-800 flex flex-col justify-between">
            <div className="flex flex-col">
              <p className="text-white font-bold">Lorem ipsum dolor sit amet</p>
              <p className="mt-1 text-xs md:text-sm text-gray-50 font-light leading-tight max-w-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio soluta saepe consequuntur
                facilis ab a. Molestiae ad saepe assumenda praesentium rem dolore? Exercitationem, neque
                obcaecati?
              </p>
            </div>
            <div className="flex justify-between items-end">
              <a href="#"
                className="bg-blue-800 px-4 py-3 rounded-lg text-white text-xs tracking-wider font-semibold hover:bg-blue-600 hover:text-white">
                Learn More
              </a>
              <img src="https://atom.dzulfarizan.com/assets/calendar.png" alt="calendar" className="w-auto h-24 object-cover" />
            </div>
          </div>
        </div>

        {/* Display other sections similar to the above example */}
        
      </div>
    </main>
  );
}
