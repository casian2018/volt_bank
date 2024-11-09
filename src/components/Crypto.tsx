// components/crypto.tsx
import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import PieChart from "./PieChart";

const Crypto = () => {
  const [total, setTotal] = useState(0);
  const [selectedChartSymbol, setSelectedChartSymbol] = useState("BTCUSD");
  const [cryptoBalances, setCryptoBalances] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/getUserCryptoBalances", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errMessage = await response.json();
          throw new Error(errMessage.error || "Failed to fetch user data");
        }

        const data = await response.json();
        if (data.cryptoBalances) {
          setCryptoBalances(data.cryptoBalances);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchPrices = async () => {
      let totalValue = 0;
  
      for (const [symbol, balance] of Object.entries(cryptoBalances)) {
        try {
          const response = await fetch(`/api/fetchCryptoPrice?symbol=${symbol}`);
          const data = await response.json();
  
          if (response.ok) {
            const price = parseFloat(data.price);
            totalValue += balance * price;
          } else {
            console.error(`Error fetching price for ${symbol}:`, data.error);
          }
        } catch (error) {
          console.error(`Error fetching price for ${symbol}:`, error);
        }
      }
  
      setTotal(totalValue);
    };
  
    if (Object.keys(cryptoBalances).length > 0) {
      fetchPrices();
    }
  }, [cryptoBalances]);

  return (
    <div className="p-6 min-h-screen">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-6 shadow-lg rounded-xl h-full">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Asset Allocation</h2>
              {/* Pass cryptoBalances to PieChart */}
              <PieChart balances={cryptoBalances} />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-6 shadow-lg rounded-xl h-full flex flex-col justify-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Asset Balance</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 font-medium">Total Balance</p>
                  <p className="text-gray-800 font-semibold text-xl">${total.toFixed(2)}</p>
                </div>
                <div className="space-y-2">
                  {Object.entries(cryptoBalances).map(([symbol, balance]) => (
                    <div key={symbol} className="flex justify-between">
                      <p className="text-gray-600 font-medium">{symbol.replace("USDT", "")}:</p>
                      <p className="text-gray-800 font-medium">{balance}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="flex flex-col w-full bg-white p-6 shadow-lg rounded-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Market Chart</h2>
          <Chart symbol={selectedChartSymbol} />
        </div>
        <div className="flex flex-col w-full lg:w-1/3 bg-white p-6 shadow-lg rounded-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Cryptocurrency</h2>
          <div className="space-y-3">
            {["BTCUSD", "ETHUSD", "LTCUSD", "XRPUSD"].map((symbol) => (
              <div
                key={symbol}
                onClick={() => setSelectedChartSymbol(symbol)}
                className={`flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer`}
              >
                <p className="text-gray-700 font-medium">View {symbol} Chart</p>
                <button
                  className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                    selectedChartSymbol === symbol
                      ? "bg-indigo-600 text-white"
                      : "bg-indigo-50 text-indigo-600 border border-indigo-500 hover:bg-indigo-100"
                  } transition duration-150`}
                >
                  {symbol}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crypto;
