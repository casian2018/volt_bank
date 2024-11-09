import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import PieChart from "./PieChart";

const Crypto = () => {
  const [total, setTotal] = useState(0);
  const [selectedChartSymbol, setSelectedChartSymbol] = useState("BTCUSD");
  const [cryptoBalances, setCryptoBalances] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchUserData = async () => { // Corrected function name
      setLoading(true); // Start loading
      try {
        const response = await fetch("/api/getUserCryptoBalances", { // Corrected API endpoint
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        if (data.cryptoBalances) {
          setCryptoBalances(data.cryptoBalances);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error instanceof Error) {
          setError(error.message); // Set error message
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchUserData(); // Corrected function call
  }, []);

  useEffect(() => {
    const fetchPrices = async () => {
      let totalValue = 0;

      // Loop through each cryptocurrency and get its current price
      for (const [symbol, balance] of Object.entries(cryptoBalances)) {
        try {
          const response = await fetch(
            `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
          );
          const data = await response.json();
          const price = parseFloat(data.price);

          totalValue += balance * price;
        } catch (error) {
          console.error(`Error fetching price for ${symbol}:`, error);
        }
      }

      setTotal(totalValue); // Update total balance
    };

    if (Object.keys(cryptoBalances).length > 0) {
      fetchPrices(); // Trigger price fetch when balances are available
    }
  }, [cryptoBalances]);

  return (
    <div className="p-6 min-h-screen">
      {loading && <p>Loading...</p>} {/* Loading indicator */}
      {error && <p className="text-red-500">{error}</p>} {/* Error message */}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-6 shadow-lg rounded-xl h-full">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Asset Allocation</h2>
              <PieChart />
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
           {/* Chart and Crypto Selector */}
           <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="flex flex-col w-full bg-white p-6 shadow-lg rounded-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Market Chart</h2>
          <Chart symbol={selectedChartSymbol} />
        </div>
        <div className="flex flex-col w-full lg:w-1/3 bg-white p-6 shadow-lg rounded-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Cryptocurrency</h2>
          <div className="space-y-3">
            {["BTCUSD", "ETHUSD", "LTCUSD", "XRPUSD"].map((Chartsymbol) => (
              <div
                key={Chartsymbol}
                onClick={() => setSelectedChartSymbol(Chartsymbol)}
                className={`flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer`}
              >
                <p className="text-gray-700 font-medium">View {Chartsymbol} Chart</p>
                <button
                  className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                    selectedChartSymbol === Chartsymbol
                      ? "bg-indigo-600 text-white"
                      : "bg-indigo-50 text-indigo-600 border border-indigo-500 hover:bg-indigo-100"
                  } transition duration-150`}
                >
                  {Chartsymbol}
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