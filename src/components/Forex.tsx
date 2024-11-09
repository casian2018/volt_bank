import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import CryptoPieChart from "./PieChart";

const fetchForexPrices = async () => {};
const Forex = () => {
  const updatedUsdBalances: { [key: string]: number } = {};
  const [forexBalances, setForexBalances] = useState<{ [key: string]: number }>(
    {}
  );
  const [selectedChartPair, setSelectedChartPair] = useState("EURUSD");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchForexBalances = async () => {
      try {
        const response = await fetch("/api/forex-balances");
        if (!response.ok) {
          throw new Error("Failed to fetch balances");
        }
        const data = await response.json();
        setForexBalances(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchForexBalances();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let totalValue = 0;
      for (const [forex, balance] of Object.entries(forexBalances)) {
        try {
          const response = await fetch(
            `https://api.exchangerate-api.com/v4/latest/USD`
          );
          const data = await response.json();
          const price = data.rates[forex.toUpperCase()] || 0;
          const usdValue = balance / price;
          updatedUsdBalances[forex] = usdValue;
          totalValue += usdValue as number;
        } catch (error) {
          console.error("⁠ Error fetching price for ${forex}:", error);
        }
      }
      setTotal(totalValue);
    };
    fetchData();
  }, []);

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
              {" "}
              <p className="text-gray-600 font-medium">{symbol}:</p>{" "}
              <p className="text-gray-800 font-medium">{balance as number}</p>{" "}
              <button>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {" "}
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 00-1 1v1.586L5.707 6.293a1 1 0 00-1.414 1.414l4.5 4.5a1 1 0 001.414 0l4.5-4.5a1 1 0 00-1.414-1.414L11 5.586V4a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />{" "}
                  <path
                    fillRule="evenodd"
                    d="M4 5a1 1 0 011-1h10a1 1 0 011 1v1a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"
                    clipRule="evenodd"
                  />{" "}
                </svg>{" "}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white p-6 shadow-lg rounded-xl w-fit mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Portfolio Allocation
          </h2>
          <CryptoPieChart />
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
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Select Currency Pair
          </h2>
          <div className="space-y-3">
            {["EURUSD", "GBPUSD", "USDJPY", "AUDUSD"].map((pair) => (
              <div
                key={pair}
                onClick={() => setSelectedChartPair(pair)}
                className={`flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer `}
              >
                <p className="text-gray-700 font-medium ">View {pair} Chart</p>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forex;
function setTotal(totalValue: number) {
  throw new Error("Function not implemented.");
}
