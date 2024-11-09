"use client";

import TransferForm from "../api/transfer";
import Nav from "../../components/nav";
import Card from "../../components/card";

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

  // Show loading, error, or transaction error messages
  if (loading) return <p>Loading user data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (transactionsError)
    return <p className="text-red-500">{transactionsError}</p>;

  return (
    <main className="container mx-auto py-6 px-4 xl:px-0 ">
      <div className="pb-24">
        <Nav/>
      </div>
      <div className="space-y-8 mt-4">
        {/* User Account Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          <div className="flex flex-col bg-gradient-to-r from-blue-900 to-indigo-600 p-8 rounded-2xl border border-gray-200 shadow-lg hover:scale-105 duration-500">
            <div className="flex justify-between space-y-4">
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
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 pt-4">
              <a
                href="#"
                className="text-white bg-green-500 hover:bg-green-600 hover:text-white px-5 py-3 w-full md:w-auto text-center rounded-lg text-xs tracking-wider font-semibold duration-250"
              >
                Add Money
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-8 bg-gradient-to-r from-blue-800 to-indigo-600 p-10 rounded-3xl border border-gray-300 shadow-xl transition-transform duration-300 hover:scale-105">
      <h1 className="text-white text-3xl font-bold">Your Cards</h1>
      <div>
        <Card email={user?.email || ""} />
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
          <div className="col-span-5 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-3">
          <h1 className="text-3xl font-bold">Transactions</h1>
          <table className="min-w-full divide-y divide-gray-200">
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
              Object.entries(user.transactions.cash).map(
                ([key, transaction]) => (
                  <tr
                    key={key}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${transaction.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.type}
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
          </div>
        </div>
    </main>
  );
}
