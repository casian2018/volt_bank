"use client";

import { useRouter } from "next/router";
import Nav from "../../components/nav";
import Card from "../../components/card";
import Footer from "../../components/footer"; // Correct import for Footer component
import { useEffect, useState } from "react";
import Transfer from "../../components/transfer"; // Updated import for Transfer component
import AddSavings from "@/components/addSavings";

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
  const router = useRouter();
  const [isTransferFormOpen, setTransferFormOpen] = useState(false);
  const [isAddSavingsFormOpen, setAddSavingsFormOpen] = useState(false);

  const openTransferForm = () => {
    setTransferFormOpen(true);
    setAddSavingsFormOpen(false);
  };

  const openAddSavingsForm = () => {
    setAddSavingsFormOpen(true);
    setTransferFormOpen(false);
  };

  const closeForms = () => {
    setTransferFormOpen(false);
    setAddSavingsFormOpen(false);
    router.reload(); // Refreshes the page to reset the state
  };

  const [user, setUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [transactionsError, setTransactionsError] = useState<string | null>(
    null
  );

  const generateNewCard = async () => {
    // Generate new card details
    const cardInfo = {
      number: '4' + Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join(''),
      cvv: Array.from({ length: 3 }, () => Math.floor(Math.random() * 10)).join(''),
      pin: Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join(''),
    };
  
    try {
      const response = await fetch('/api/createCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user?.email, cardInfo }),
      });
  
      if (response.ok) {
        alert('New card created successfully!');
        // Instead of reloading, push to profile page
        router.push('/profile');
      } else {
        alert('Failed to create card.');
      }
    } catch (error) {
      console.error('Error creating card:', error);
      alert('An error occurred while creating the card.');
    }
  };
  

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

    const handleDatabaseChange = () => {
      fetchUserData();
    };

    window.addEventListener("databaseChange", handleDatabaseChange);

    return () => {
      window.removeEventListener("databaseChange", handleDatabaseChange);
    };
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

  if (loading)
    return (
      <p className="text-center text-lg font-semibold">Loading user data...</p>
    );
  if (error)
    return <p className="text-center text-red-500 font-semibold">{error}</p>;
  if (transactionsError)
    return (
      <p className="text-center text-red-500 font-semibold">
        {transactionsError}
      </p>
    );

  return (
    <main className="w-full bg-gray-50">
      <div className="pb-20">
        <Nav />
      </div>

      <div className="space-y-10 mt-6 px-24 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <p className="text-lg text-gray-200">** ** *321</p>
              </div>

              <h2 className="text-4xl text-yellow-400 font-extrabold ml-auto">
                ${user?.balance?.toFixed(2) ?? "0.00"}
              </h2>
            </div>

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
                <p className="text-lg text-gray-200">** ** *321</p>
              </div>

              <h2 className="text-4xl text-yellow-400 font-extrabold ml-auto">
                ${user?.savings?.toFixed(2) ?? "0.00"}
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6 pt-4">
              <button
                onClick={openAddSavingsForm}
                className="px-6 py-3 w-full md:w-auto text-center rounded-lg text-white bg-green-500 hover:bg-green-600 text-xs font-semibold tracking-wider transition duration-250"
              >
                Add Money
              </button>
            </div>
          </div>
        </div>

        {isTransferFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Transfer />
              <button
                onClick={closeForms}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {isAddSavingsFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <AddSavings />
              <button
                onClick={closeForms}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}

<div className="bg-white p-10 rounded-xl shadow-xl transform transition-all hover:scale-103 duration-500" id="cards">
      <h1 className="text-black text-3xl font-semibold mb-6">Your Cards</h1>
      <div>
        <Card email={user?.email || ""} />
      </div>
      <button
        onClick={generateNewCard}
        className="mt-4 px-6 py-3 rounded-lg text-white bg-blue-500 hover:bg-blue-600 text-xs font-semibold tracking-wider transition duration-250"
      >
        Generate New Card
      </button>
    </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col bg-gray-50 p-6 rounded-xl shadow-md hover:scale-105 transition-all duration-200"
            >
              <h3 className="text-lg font-semibold">{category.type}</h3>
              <p className="text-sm text-gray-500">Total: ${category.total}</p>
              <p className="text-sm text-gray-400">Last Transaction: {category.lastTransaction}</p>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-50 shadow-lg" id="transactions">
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

        <Footer />
    </main>
  );
}