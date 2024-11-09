// Forex.tsx
import React, { useEffect, useState } from "react";
import Chart from "./Chart"; // Assuming you have this component
import PieChart from "./PieChart";

const Forex: React.FC = () => {
  const [forexBalances, setForexBalances] = useState<{ [key: string]: number }>(
    {}
  );
  const [usdBalances, setUsdBalances] = useState<{ [key: string]: number }>({});
  const [selectedChartPair, setSelectedChartPair] = useState("EURUSD");
  const [total, setTotal] = useState(0);

  const addNewSymbol = async () => {
    const newSymbol = prompt("Enter a new currency  (e.g., EUR):");
    const initialBalance = parseFloat("0");

    if (newSymbol && !isNaN(initialBalance)) {
      try {
        // Update the local state for instant feedback
        setForexBalances((prevBalances) => ({
          ...prevBalances,
          [newSymbol.toUpperCase()]: initialBalance,
        }));

        // Save the new balance in the database
        const response = await fetch("/api/forex-balances", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            symbol: newSymbol.toUpperCase().slice(0, 3),
            balance: 0,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add new currency pair");
        }

        setSelectedChartPair(newSymbol.toUpperCase()+'USD');
		setSelectedChartPair(Object.keys(forexBalances)[0] || '');
      } catch (error) {
        console.error("Error adding new symbol:", error);
      }
    }
  };

  useEffect(() => {
    const fetchForexBalances = async () => {
      try {
        const response = await fetch("/api/forex-balances");
        if (!response.ok) {
          throw new Error("Failed to fetch balances");
        }
        const data = await response.json();
        setForexBalances(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchForexBalances();
  }, []);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      const newUsdBalances: { [key: string]: number } = {};
      let totalValue = 0;

      for (const [currency, balance] of Object.entries(forexBalances)) {
        try {
          const response = await fetch(`https://open.er-api.com/v6/latest/USD`);
          const data = await response.json();
          const rate = data.rates[currency.toUpperCase()] || 0;
          const usdValue = balance * (1 / rate);
          newUsdBalances[currency] = usdValue;
          totalValue += usdValue;
        } catch (error) {
          console.error(`Error fetching exchange rate for ${currency}:`, error);
        }
      }

      setUsdBalances(newUsdBalances);
      setTotal(totalValue);
    };

    if (Object.keys(forexBalances).length > 0) {
      fetchExchangeRates();
    }
  }, [forexBalances]);

  return (
    <div className="p-6 bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">
      <div className="flex gap-12">
        <div className="mb-8 bg-white p-6 shadow-lg rounded-xl mt-6 w-full">
          <h2 className="text-xl font-semibold text-gray-800">Total Balance</h2>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            ${total.toFixed(2)}
          </p>

          {Object.entries(forexBalances).map(([symbol, balance]) => (
            <div key={symbol} className="flex justify-between">
              <p className="text-gray-600 font-medium">{symbol}:</p>
              <p className="text-gray-800 font-medium">
                {balance.toFixed(2)} (
                {usdBalances[symbol]?.toFixed(2) ?? "0.00"} USD)
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white p-6 shadow-lg rounded-xl w-fit mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Portfolio Allocation
          </h2>
          <PieChart balances={forexBalances} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col w-full lg:w-2/3 bg-white p-6 shadow-lg rounded-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Market Chart
          </h2>
          <Chart symbol={selectedChartPair} />
        </div>

        <div className="flex flex-col w-full lg:w-1/3 bg-white p-6 shadow-lg rounded-xl">
          <div className="flex flex-col">
            <div className="flex justify-between pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Select Currency Pair
              </h2>
              <button
                className="border-2 py-2 px-4 rounded-lg hover:bg-indigo-600 hover:text-white transition"
                onClick={addNewSymbol}
              >
                Add
              </button>
            </div>
            <div className="space-y-3 flex flex-col">
              {Object.keys(forexBalances).map((currency) => {
                if (currency === "USD") return null;
                const pair = currency + "USD";
                return (
                  <div
                    key={pair}
                    onClick={() => setSelectedChartPair(pair)}
                    className={`flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer`}
                  >
                    <p className="text-gray-700 font-medium">
                      View {pair} Chart
                    </p>
                    <button
                      className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                        selectedChartPair === pair
                          ? "bg-indigo-600 text-white"
                          : "bg-indigo-50 text-indigo-600 border border-indigo-500 hover:bg-indigo-100"
                      } transition duration-150`}
                    >
                      {pair}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forex;