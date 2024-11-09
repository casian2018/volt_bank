"use client";

import TransferForm from "../api/transfer";
import Nav from "../../components/nav";
import Card from "../../components/card";
import footer from "../../components/footer";  // Asigură-te că ai footer-ul corect importat
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

  // Fetch user data including email, user info, etc.
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const emailResponse = await fetch("/api/getEmail");
        if (!emailResponse.ok) throw new Error("Could not retrieve email");

        const emailData = await emailResponse.text();
        if (!emailData) throw new Error("Email not found");

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

  // Fetch transaction categories
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

  if (loading) return <p className="text-center text-lg font-semibold">Loading user data...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">{error}</p>;
  if (transactionsError) return <p className="text-center text-red-500 font-semibold">{transactionsError}</p>;

  return (
    <main className="w-full bg-gray-50">
      <div className="pb-20">
        <Nav />
      </div>

      <div className="space-y-10 mt-6 px-6 xl:px-0">
        {/* User Account Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Account Section */}
          <div className="flex flex-col space-y-6 bg-gradient-to-r from-blue-800 to-indigo-700 p-8 rounded-xl border border-gray-200 shadow-lg hover:scale-105 transition-all duration-500">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-100 font-semibold uppercase tracking-wider">
                Main Account
              </span>
              <span className="text-xs text-gray-100 font-semibold uppercase tracking-wider">
                Available Funds
              </span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <div className="flex flex-col space-y-4">
                <h2 className="text-white font-semibold text-2xl">
                  {user?.firstName}'s Account
                </h2>
                <p className="text-lg text-gray-200">**** **** *321</p>
              </div>

              {/* Available Funds */}
              <h2 className="text-4xl text-yellow-400 font-extrabold ml-auto">
                ${user?.balance.toFixed(2)}
              </h2>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 pt-4">
              <button
                onClick={openTransferForm}
                className="px-6 py-3 w-full md:w-auto text-center rounded-lg text-white bg-green-500 hover:bg-green-600 text-xs font-semibold tracking-wider transition duration-250"
              >
                Transfer Money
              </button>
              <a
                href="#"
                className="px-6 py-3 w-full md:w-auto text-center rounded-lg text-black bg-yellow-50 hover:bg-yellow-400 hover:text-white text-xs font-semibold tracking-wider transition duration-250"
              >
                Link Account
              </a>
            </div>
          </div>

          {/* Savings Account Section */}
          <div className="flex flex-col space-y-6 bg-gradient-to-r from-blue-800 to-indigo-700 p-8 rounded-xl border border-gray-200 shadow-lg hover:scale-105 transition-all duration-500">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-100 font-semibold uppercase tracking-wider">
                Savings Account
              </span>
              <span className="text-xs text-gray-100 font-semibold uppercase tracking-wider">
                Available Funds
              </span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <div className="flex flex-col space-y-4">
                <h2 className="text-white font-semibold text-2xl">
                  {user?.firstName}'s Savings Account
                </h2>
                <p className="text-lg text-gray-200">**** **** *321</p>
              </div>

              {/* Savings Balance */}
              <h2 className="text-4xl text-yellow-400 font-extrabold ml-auto">
                ${user?.savings.toFixed(2)}
              </h2>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 pt-4">
              <a
                href="#"
                className="px-6 py-3 w-full md:w-auto text-center rounded-lg text-white bg-green-500 hover:bg-green-600 text-xs font-semibold tracking-wider transition duration-250"
              >
                Add Money
              </a>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="bg-white p-10 rounded-xl shadow-xl transform transition-all hover:scale-103 duration-500">
          <h1 className="text-black text-3xl font-semibold mb-6">Your Cards</h1>
          <div>
            <Card email={user?.email || ""} />
          </div>
        </div>

        {/* Transaction Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
            <h2 className=" text-2xl font-semibold text-gray-800 mb-4">
              Expenses by Category
            </h2>
          </div>

          {categories.map((category) => (
            <div
              key={category.type}
              className="bg-gradient-to-tl from-orange-300 to-yellow-300 p-6 rounded-xl border border-gray-200 shadow-md hover:bg-teal-500 hover:text-white transition duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <p className="text-xs text-white uppercase">{category.type}</p>
                  <h3 className="text-lg text-white font-semibold mt-2">
                    ${category.total.toFixed(2)}
                  </h3>
                  <span className="mt-4 text-xs text-white font-medium">
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
        <div className="bg-white p-6 rounded-xl border border-gray-50 shadow-lg">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Transactions</h1>
          <table className="min-w-full divide-y divide-gray-200 mt-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {user &&
                Object.entries(user.transactions.cash).map(([key, transaction]) => (
                  <tr key={key} className="hover:bg-gray-50 transition duration-200">
                    <td className="px-6 py-4 text-sm text-gray-900">{transaction.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">${transaction.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{transaction.type}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add the Footer Here */}
      <footer/>
      
    </main>
  );
}
