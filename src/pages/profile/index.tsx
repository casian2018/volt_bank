"use client";

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
        date: {
          $date: number;
        };
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState<boolean>(true);
  const [transactionsError, setTransactionsError] = useState<string | null>(
    null
  );

  // Fetch user data from the email stored in email.txt
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const emailResponse = await fetch("/api/getEmail");
        if (!emailResponse.ok) {
          throw new Error("Could not retrieve email");
        }
        const emailData = await emailResponse.text();

        if (!emailData) {
          throw new Error("Email not found in the file");
        }

        // Fetch the user data using the email
        const response = await fetch(`/api/getUser?email=${emailData.trim()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok && data.user) {
          setUser(data.user);
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setTransactionsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Fetch transaction categories (grouped by type)
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
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading || transactionsLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (transactionsError)
    return <p className="text-red-500">{transactionsError}</p>;

  return (
    <main className="container mx-w-6xl mx-auto py-4">
      <div className="flex flex-col space-y-8">
        <div className="px-4 xl:p-0 gap-y-4 md:gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-6 rounded-2xl border border-gray-50">
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
                  <h2 className="text-gray-800 font-bold tracking-widest leading-tight">
                    {user?.firstName}'s Account
                  </h2>
                  <div className="flex items-center gap-4">
                    <p className="text-lg text-gray-600 tracking-wider">
                      **** **** *321
                    </p>
                  </div>
                </div>
                <h2 className="text-lg md:text-xl xl:text-3xl text-gray-700 font-black tracking-wider">
                  <span className="md:text-xl">$</span>
                  {user?.balance.toFixed(2)}
                </h2>
              </div>
              <div className="flex gap-2 md:gap-4">
                <a
                  href="#"
                  className="bg-blue-600 px-5 py-3 w-full text-center md:w-auto rounded-lg text-white text-xs tracking-wider font-semibold hover:bg-blue-800"
                >
                  Transfer Money
                </a>
                <a
                  href="#"
                  className="bg-blue-50 px-5 py-3 w-full text-center md:w-auto rounded-lg text-blue-600 text-xs tracking-wider font-semibold hover:bg-blue-600 hover:text-white"
                >
                  Link Account
                </a>
              </div>
            </div>

            <div className="flex flex-col space-y-6 md:h-full md:justify-between">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  Savings Account
                </span>
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  Available Funds
                </span>
              </div>
              <div className="flex gap-2 md:gap-4 justify-between items-center">
                <div className="flex flex-col space-y-4">
                  <h2 className="text-gray-800 font-bold tracking-widest leading-tight">
                    {user?.firstName}'s Savings Account
                  </h2>
                  <div className="flex items-center gap-4">
                    <p className="text-lg text-gray-600 tracking-wider">
                      **** **** *321
                    </p>
                  </div>
                </div>
                <h2 className="text-lg md:text-xl xl:text-3xl text-gray-700 font-black tracking-wider">
                  <span className="md:text-xl">$</span>
                  {user?.savings.toFixed(2)}
                </h2>
              </div>
              <div className="flex gap-2 md:gap-4">
                <a
                  href="#"
                  className="bg-blue-600 px-5 py-3 w-full text-center md:w-auto rounded-lg text-white text-xs tracking-wider font-semibold hover:bg-blue-800"
                >
                  Transfer Money
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 xl:p-0 gap-4 xl:gap-6">
          <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-between">
            <h2 className="text-xs md:text-sm text-gray-700 font-bold tracking-wide md:tracking-wider">
              Expenses By Category
            </h2>
          </div>

          {categories.map((category) => (
            <div
              key={category.type}
              className="bg-white p-6 rounded-xl border border-gray-50"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <p className="text-xs text-gray-600 tracking-wide">
                    {category.type}
                  </p>
                  <h3 className="mt-1 text-lg text-blue-500 font-bold">
                    ${category.total.toFixed(2)}
                  </h3>
                  <span className="mt-4 text-xs text-gray-500">
                    Last Transaction{" "}
                    {new Date(category.lastTransaction).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
          <div className="col-start-1 col-end-5">
            <h2 className="text-xs md:text-sm text-gray-800 font-bold tracking-wide">
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
              Object.keys(user?.transactions.cash)
                .reverse()
                .slice(0, 5)
                .map((key) => (
                  <div
                    key={key}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <div>
                      <h3 className="font-semibold">
                        {user?.transactions.cash[key].name}
                      </h3>
                      <p>{user?.transactions.cash[key].type}</p>
                    </div>
                    <p className="text-right font-bold">
                      ${Number(user?.transactions.cash[key].price).toFixed(2)}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </main>
  );
}
