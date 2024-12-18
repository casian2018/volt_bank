"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../images/logo.png";

// Inside your ProfilePage or any component

import { useRouter } from "next/router";

const signOut = async () => {
  try {
    // Call the API route to sign out
    const response = await fetch('/api/signOut', {
      method: 'POST',
    });

    if (response.ok) {
      // Redirect to the homepage or login page after successful sign-out
      window.location.href = '/';  // You can change this to wherever you want to redirect
    } else {
      alert("Failed to sign out.");
    }
  } catch (error) {
    console.error("Error signing out:", error);
    alert("An error occurred while signing out.");
  }
};


export default function Nav() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isTransactionsOpen, setTransactionsOpen] = useState(false);

  return (
    
    <>
      <div className="px-12 mx-auto sm:px-6 fixed w-full bg-white z-[99]">
        <div className="relative py-6 ">
          <nav
            className="relative flex items-center justify-between md:justify-center"
            aria-label="Global"
          >
            <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <a href="#">
                  <span className="sr-only"></span>
                  <Image src={logo} alt="Logo" className="h-14 w-auto" />
                </a>
                <div className="flex items-center -mr-2 md:hidden">
                  <button
                    className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-50 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-50"
                    type="button"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:flex md:space-x-10 list-none">
              <li>
                <a
                  href="/"
                  className="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                  target=""
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/profile"
                  className="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                  target=""
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="/profile#cards"
                  className="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                >
                  Cards
                </a>
              </li>
              <li>
                <a
                  href="/profile#transactions"
                  className="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                >
                  Transactions
                </a>
              </li>
              <li>
                <a
                  href="/crypto"
                  className="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                  target=""
                >
                  Crypto
                </a>
              </li>
              <li>
                <a
                  href="/stocks"
                  className="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                  target=""
                >
                  Stocks
                </a>
              </li>
              <li>
                <a
                  href="/forex"
                  className="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                  target=""
                >
                  Forex
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                  target=""
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/learn"
                  className="text-base font-normal text-gray-500 list-none hover:text-gray-900"
                  target=""
                >
                  Learn 
                </a>
              </li>
            </div>
            <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
              
              <div className="inline-flex rounded-full shadow"><button onClick={signOut}
                  className="inline-flex items-center px-4 py-2 text-base text-gray-900 bg-white border border-transparent rounded-full cursor-pointer font-base hover:bg-gray-50 ">Sign out</button></div>
              
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
