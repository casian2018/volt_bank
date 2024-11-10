import React, { useEffect, useState } from "react";
import Chart from "./Chart"; // Assuming you have this component
import PieChart from "./PieChart";

const Forex: React.FC = () => {
    const [currencyBalances, setCurrencyBalances] = useState<{
        [key: string]: number;
    }>({});
    const [usdBalances, setUsdBalances] = useState<{ [key: string]: number }>({});
    const [selectedChartPair, setSelectedChartPair] = useState('');
    const [total, setTotal] = useState(0);

    const addNewSymbol = async () => {
        const newSymbol = prompt("Enter a new currency (e.g., EUR):");
        const initialBalance = parseFloat("0");

        if (newSymbol && !isNaN(initialBalance)) {
            try {
                // Update the local state for instant feedback
                setCurrencyBalances((prevBalances) => ({
                    ...prevBalances,
                    [newSymbol.toUpperCase()]: initialBalance,
                }));

                // Save the new balance in the database
                const response = await fetch("/api/forex-balances", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        symbol: newSymbol.toUpperCase(),
                        balance: 0,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to add new currency");
                }

                setSelectedChartPair(newSymbol.toUpperCase() + "USD");
                setSelectedChartPair(Object.keys(currencyBalances)[0] || '');
            } catch (error) {
                console.error("Error adding new symbol:", error);
            }
        }
    };

    useEffect(() => {
        const fetchCurrencyBalances = async () => {
            try {
                const response = await fetch("/api/forex-balances");
                if (!response.ok) {
                    throw new Error("Failed to fetch balances");
                }
                const data = await response.json();
                setCurrencyBalances(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCurrencyBalances();
    }, []);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            const newUsdBalances: { [key: string]: number } = {};
            let totalValue = 0;

            for (const [currency, balance] of Object.entries(currencyBalances)) {
                try {
                    const response = await fetch(
                        `https://api.exchangerate-api.com/v4/latest/USD`
                    );
                    const data = await response.json();
                    const rate = data.rates[currency.toUpperCase()] || 0;
                    const usdValue = balance / rate;
                    newUsdBalances[currency] = usdValue;
                    totalValue += usdValue;
                } catch (error) {
                    console.error(`Error fetching exchange rate for ${currency}:`, error);
                }
            }

            setUsdBalances(newUsdBalances);
            setTotal(totalValue);
        };

        if (Object.keys(currencyBalances).length > 0) {
            fetchExchangeRates();
        }
    }, [currencyBalances]);

    const closeModal = () => {
        const modal = document.getElementById("crud-modal");
        if (modal) {
            modal.classList.add("hidden");
        }
    };

    const calculatePrice = async () => {
        const selectedCurrency = (document.getElementById("category") as HTMLSelectElement).value;
        const spendingPrice = parseFloat((document.getElementById("price") as HTMLInputElement).value);
        const currentPrice = parseFloat((await (await fetch(`https://api.exchangerate-api.com/v4/latest/USD`)).json()).rates[selectedCurrency.toUpperCase()] || 0);

        if (!isNaN(spendingPrice) && !isNaN(currentPrice)) {
            const amount = spendingPrice * currentPrice;
            console.log(amount);
            const priceP = document.getElementById("price");
            const priceText = document.getElementById("priceText");
            if (priceP) {
                priceP.classList.add('block');
                if (priceText) {
                    priceText.innerHTML = amount.toFixed(2) + " " + selectedCurrency;
                }
            }
        }
    };

    const buyCurrency = async () => {
        const selectedCurrency = (document.getElementById("category") as HTMLSelectElement).value;
        const spendingPrice = parseFloat((document.getElementById("price") as HTMLInputElement).value);
        const currentPrice = parseFloat((await (await fetch(`https://api.exchangerate-api.com/v4/latest/USD`)).json()).rates[selectedCurrency.toUpperCase()] || 0);

        if (!isNaN(spendingPrice) && !isNaN(currentPrice)) {
            const amount = spendingPrice * currentPrice;
            console.log(amount);

            try {
                // Send request to the backend to buy the forex
                const response = await fetch("/api/buyForex", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        symbol: selectedCurrency,
                        amount: amount,
                        spendingPrice: spendingPrice,
                    }),
                });

                // After success, fetch the updated forex prices and balances
                if (!response.ok) {
                    await fetchForexPrices();
                    window.location.reload();

                    // Update the local state for instant feedback
                    setCurrencyBalances((prevBalances) => ({
                        ...prevBalances,
                        [selectedCurrency]: (prevBalances[selectedCurrency] || 0) + amount,
                    }));

                    await fetchForexPrices();

                    closeModal();
                } 
            } catch (error) {
                console.error("Error buying currency:", error);
            }
        }
    };

    const sellCurrency = async () => {
        const selectedCurrency = (document.getElementById("category") as HTMLSelectElement).value;
        const sellingPrice = parseFloat((document.getElementById("price") as HTMLInputElement).value);
        const currentPrice = parseFloat((await (await fetch(`https://api.exchangerate-api.com/v4/latest/USD`)).json()).rates[selectedCurrency.toUpperCase()] || 0);

        if (!isNaN(sellingPrice) && !isNaN(currentPrice)) {
            const amount = sellingPrice * currentPrice;

            if ((currencyBalances[selectedCurrency] || 0) < amount) {
                alert("Insufficient currency balance to sell");
                return;
            }

            try {
                // Send request to the backend to sell the forex
                const response = await fetch("/api/sellForex", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        pair: selectedCurrency,
                        amount: amount,
                        sellingPrice: sellingPrice,
                    }),
                });

                // After success, fetch the updated forex prices and balances
                if (response.ok) {
                    await fetchForexPrices();

                    // Update the local state for instant feedback
                    setCurrencyBalances((prevBalances) => ({
                        ...prevBalances,
                        [selectedCurrency]: (prevBalances[selectedCurrency] || 0) - amount,
                    }));

                    closeModal();
                } else {
                    throw new Error("Failed to sell currency");
                }
            } catch (error) {
                console.error("Error selling currency:", error);
            }
        }
    };

    const fetchForexPrices = async () => {
        const updatedUsdBalances: { [key: string]: number } = {};
        let totalValue = 0;

        for (const [symbol, balance] of Object.entries(currencyBalances)) {
            try {
                const response = await fetch(
                    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=csn70hpr01qqapai5o6gcsn70hpr01qqapai5o70`
                );
                const data = await response.json();
                const price = data.c || 0;
                const usdValue = balance / price;
                updatedUsdBalances[symbol] = usdValue;
                totalValue += usdValue;
            } catch (error) {
                console.error(`Error fetching price for ${symbol}:`, error);
            }
        }
        setTotal(totalValue);
        setUsdBalances(updatedUsdBalances);
    };

    return (
        <div className="p-6 bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">
            <div className="flex gap-12">
                <div className="mb-8 bg-white p-6 shadow-lg rounded-xl mt-6 w-full">
                    <h2 className="text-xl font-semibold text-gray-800">Total Balance</h2>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ${total.toFixed(2)}
                    </p>

                    {Object.entries(currencyBalances).map(([symbol, balance]) => (
                        <div key={symbol} className="flex justify-between">
                            <p className="text-gray-600 font-medium">{symbol}:</p>
                            <p className="text-gray-800 font-medium">
                                {balance.toFixed(2)} (
                                {usdBalances[symbol]?.toFixed(2) ?? "0.00"} USD)
                            </p>
                        </div>
                    ))}

                    <div
                        id="crud-modal"
                        tabIndex={-1}
                        aria-hidden="true"
                        className="hidden fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
                    >
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Buy/Sell Currency
                                    </h3>
                                    <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={closeModal}
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {/* Modal body */}
                                <form className="p-4 md:p-5">
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2 sm:col-span-1">
                                            <label
                                                htmlFor="category"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Select a currency
                                            </label>
                                            <select
                                                id="category"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                onClick={calculatePrice}
                                            >
                                                {Object.keys(currencyBalances).map((symbol) => (
                                                    symbol !== "USD" && (
                                                        <option key={symbol} value={symbol}>
                                                            {symbol}
                                                        </option>
                                                    )
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label
                                                htmlFor="price"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                USD to spend/receive 
                                            </label>
                                            <input
                                                type="number"
                                                name="price"
                                                id="price"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder='$1000'
                                                required
                                                onChange={calculatePrice}
                                            />
                                        </div>
                                        
                                        <div id="price" className="col-span-2">
                                            <label
                                                htmlFor="description"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Coin Amount
                                            </label>
                                            <p
                                                id="priceText"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            ></p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            className="w-full text-white flex items-center justify-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"

                                            onClick={() => {
                                                buyCurrency();
                                                window.location.reload();
                                            }}
                                        >
                                            Buy Currency
                                        </button>
                                        <button
                                            type="button"
                                            className="w-full text-white flex items-center justify-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        onClick={async () => {
                                            await sellCurrency();
                                            await new Promise(resolve => setTimeout(resolve, 750));
                                            // window.location.reload();
                                        }}
                                        >
                                            Sell Currency
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <button
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                        onClick={() => {
                            const modal = document.getElementById("crud-modal");
                            if (modal) {
                                modal.classList.remove("hidden");
                            }
                        }}
                    >
                        Show Modal
                    </button>
                </div>

                <div className="mt-6 bg-white p-6 shadow-lg rounded-xl w-fit mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Portfolio Allocation
                    </h2>
                    <PieChart balances={currencyBalances} />
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
                            {Object.keys(currencyBalances).map((currency) => {
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