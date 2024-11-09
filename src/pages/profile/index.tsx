"use client";

import Image from "next/image";
import logo from "../../images/logo.png";
import TransferForm from "../api/transfer"

import { useEffect, useState } from "react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  age: number;
  balance: number;
  savings: number;
  transactions: {
    cash: {
      [key: string]: {
        name: string;
        price: number;
        type: string;
        date: { $date: number };
      };
    };
  };
}

interface TransactionCategory {
  type: string;
  total: number;
  lastTransaction: string;
}

export default function ProfilePage() {

  const [isTransferFormOpen, setTransferFormOpen] = useState(false);

  const openTransferForm = () => setTransferFormOpen(true);
  const closeTransferForm = () => setTransferFormOpen(false);


  const [user, setUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [transactionsError, setTransactionsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const emailResponse = await fetch("/api/getEmail");
        if (!emailResponse.ok) throw new Error("Could not retrieve email");

        const emailData = await emailResponse.text();
        if (!emailData) throw new Error("Email not found in the file");

        const response = await fetch(`/api/getUser?email=${emailData.trim()}`);
        const data = await response.json();

        if (response.ok && data.user) {
          setUser(data.user);
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/getTransactionsByType");
        const data = await response.json();

        if (response.ok && data) {
          setCategories(data);
        } else {
          throw new Error("No data found");
        }
      } catch (error) {
        setTransactionsError(
          error instanceof Error ? error.message : "An error occurred"
        );
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (transactionsError)
    return <p className="text-red-500">{transactionsError}</p>;

  return (
    <main className="container mx-auto py-6 px-4 xl:px-0 ">
      {/* Header with Logo */}
      <header className="w-full py-4 flex justify-center items-center">
        <Image src={logo} alt="Logo" className="h-12 w-auto" />
      </header>

      <div className="space-y-8 mt-4">
        {/* User Account Information */}
        <div className="gap-y-4 md:gap-6">
          {/* Main Account Section */}

          
          <div className="flex flex-col space-y-6 bg-gradient-to-r from-blue-900 to-indigo-600 p-8 rounded-2xl border border-gray-200 shadow-lg ease-in-out hover:scale-105 duration-500">
            <div className="flex justify-between">
              <span className="text-xs text-gray-100 font-semibold uppercase tracking-wider">
                Main Account
              </span>
              <span className="text-xs text-gray-100 font-semibold uppercase tracking-wider">
                Available Funds
              </span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <div className="flex flex-col space-y-4">
                <h2 className="text-white font-bold tracking-widest">
                  {user?.firstName}'s Account
                </h2>
                <p className="text-lg text-white tracking-wider">
                  **** **** *321
                </p>
              </div>

              {/* Available Funds */}
              <h2 className="text-3xl text-yellow-400 font-black ml-auto">
                ${user?.balance.toFixed(2)}
              </h2>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <button 
                
                className="px-5 py-3 w-full md:w-auto text-center rounded-lg text-white bg-green-500 hover:bg-green-600 text-xs tracking-wider font-semibold transition duration-250"
              >
                Transfer Money
                
              </button>
              <a
                href="#"
                className="px-5 py-3 w-full md:w-auto text-center rounded-lg text-black bg-yellow-50 hover:bg-yellow-400 hover:text-white text-xs tracking-wider font-semibold transition duration-250"
              >
                Link Account
              </a>
            </div>
          </div>

          {/* Savings Account Section */}
          <div className="flex flex-col space-y-6 bg-gradient-to-r from-blue-900 to-indigo-600 p-8 rounded-2xl border border-gray-200 shadow-lg mt-6 hover:scale-105 duration-500">
            <div className="flex justify-between">
              <span className="text-xs text-gray-100 font-semibold uppercase tracking-wider">
                Savings Account
              </span>
              <span className="text-xs text-gray-100 font-semibold uppercase tracking-wider">
                Available Funds
              </span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <div className="flex flex-col space-y-4">
                <h2 className="text-white font-bold tracking-widest">
                  {user?.firstName}'s Savings Account
                </h2>
                <p className="text-lg text-white tracking-wider">
                  **** **** *321
                </p>
              </div>

              {/* Savings Balance */}
              <h2 className="text-3xl text-yellow-400 font-black ml-auto">
                ${user?.savings.toFixed(2)}
              </h2>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <a
                href="#"
                className="text-white bg-green-500 hover:bg-green-600 hover:text-white px-5 py-3 w-full md:w-auto text-center rounded-lg text-xs tracking-wider font-semibold duration-250"
              >
                Transfer Money
              </a>
            </div>
          </div>
        </div>

        {/* Transaction Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 xl:px-0">
          <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 flex justify-between">
            <h2 className="hover-scale-1. text-2xl md:text-sm text-gray-800 font-bold tracking-wide md:tracking-wider">
              Expenses By Category
            </h2>
          </div>

          {categories.map((category) => (
            <div
              key={category.type}
              className="bg-gradient-to-tl from-orange-300 to-yellow-300 p-6 rounded-xl border border-gray-200 shadow-md hover:bg-teal-500 hover:text-white w-full"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <p className="text-xs text-white tracking-wide">
                    {category.type}
                  </p>
                  <h3 className="mt-1 text-lg text-white font-bold">
                    ${category.total.toFixed(2)}
                  </h3>
                  <span className="mt-4 text-xs text-white font-medium tracking-widest">
                    Last Transaction: {category.lastTransaction}
                  </span>
                </div>
                <div className="text-white text-xl font-extrabold">
                  <span className="text-xs">USD</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Latest Transactions */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-y-4 md:gap-6 mx-auto max-w-screen-lg">
          <div className="col-span-5">
            <h2 className="text-2xl md:text-sm text-gray-800 font-bold tracking-wide">
              Summary Transactions
            </h2>
          </div>

          <div className="col-span-5 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-sm text-gray-600 font-bold tracking-wide">
                Latest Transactions
              </h2>
              <a
                href="#"
                className="text-xs text-blue-500 font-semibold hover:text-blue-700"
              >
                View all
              </a>
            </div>
            {user?.transactions.cash &&
              Object.keys(user.transactions.cash)
                .reverse()
                .slice(0, 5)
                .map((key) => {
                  const transaction = user.transactions.cash[key];
                  // Verifică dacă price este un număr valid
                  const price =
                    typeof transaction.price === "number" && !isNaN(transaction.price)
                      ? transaction.price
                      : 0; // Valoare implicită dacă price nu este valid

                  return (
                    <div
                      key={key}
                      className="flex justify-between text-sm text-gray-600"
                    >
                      <div>
                        <h3 className="font-semibold">{transaction.name}</h3>
                        <p>{transaction.type}</p>
                      </div>
                      <p className="text-right font-bold">
                        ${price.toFixed(2)} {/* Aplică toFixed doar dacă price este un număr valid */}
                      </p>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </main>
  );
}
