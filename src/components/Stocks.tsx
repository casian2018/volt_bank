import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import PieChart from "./PieChart";

const Stocks = () => {
	const [selectedStock, setSelectedStock] = useState("");
	const [stockPrices, setStockPrices] = useState<{ [key: string]: number }>({});
	const [stockBalances, setStockBalances] = useState<{ [key: string]: number }>(
		{}
	);
	const [total, setTotal] = useState(0);

	const addNewStock = async () => {
		const newStock = prompt("Enter a new stock symbol (e.g., TSLA):");
		const initialBalance = 0; // Set initial balance to zero

		if (newStock) {
			try {
				// Update the local state for instant feedback
				setStockBalances((prevBalances) => ({
					...prevBalances,
					[newStock.toUpperCase()]: initialBalance,
				}));

				// Save the new stock in the database
				const response = await fetch("/api/stock-balances", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						symbol: newStock.toUpperCase(),
						balance: initialBalance,
					}),
				});

				if (!response.ok) {
					throw new Error("Failed to add new stock");
				}

				setSelectedStock(newStock.toUpperCase());
			} catch (error) {
				console.error("Error adding new stock:", error);
			}
		}
	};

	useEffect(() => {
		const fetchStockBalances = async () => {
			try {
				const response = await fetch("/api/stock-balances", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
				});
				if (!response.ok) {
					throw new Error("Failed to fetch balances");
				}
				const data = await response.json();
				setStockBalances(data);
				setSelectedStock(Object.keys(data)[0] || "");
			} catch (error) {
				console.error(error);
			}
		};

		fetchStockBalances();
	}, []);

	const fetchStockPrices = async () => {
		const updatedUsdBalances: { [key: string]: number } = {};
		let totalValue = 0;

		for (const [stock, balance] of Object.entries(stockBalances)) {
			try {
				const response = await fetch(
					`https://finnhub.io/api/v1/quote?symbol=${stock}&token=csn70hpr01qqapai5o6gcsn70hpr01qqapai5o70`
				);
				const data = await response.json();
				const price = data.c || 0;
				const usdValue = balance * price;
				updatedUsdBalances[stock] = usdValue;
				totalValue += usdValue;
			} catch (error) {
				console.error(`Error fetching price for ${stock}:`, error);
			}
		}
		setStockPrices(updatedUsdBalances);
		setTotal(totalValue);
	};

	useEffect(() => {
		if (Object.keys(stockBalances).length > 0) {
			fetchStockPrices();
		}
	}, [stockBalances]);

	const closeModal = () => {
		const modal = document.getElementById("crud-modal");
		if (modal) {
			modal.classList.add("hidden");
		}
	};

	const calculatePrice = async () => {
		const selectedStock = (
			document.getElementById("category") as HTMLSelectElement
		).value;
		const spendingPrice = parseFloat(
			(document.getElementById("price") as HTMLInputElement).value
		);
		const currentPrice = parseFloat(
			(
				await (
					await fetch(
						`https://finnhub.io/api/v1/quote?symbol=${selectedStock}&token=csn70hpr01qqapai5o6gcsn70hpr01qqapai5o70`
					)
				).json()
			).c
		);

		if (!isNaN(spendingPrice) && !isNaN(currentPrice)) {
			const amount = spendingPrice / currentPrice;
			const priceText = document.getElementById("priceText");
			if (priceText) {
				priceText.innerHTML = amount.toFixed(6) + " shares of " + selectedStock;
			}
		}
	};

	const buyStock = async () => {
		const selectedStock = (
			document.getElementById("category") as HTMLSelectElement
		).value;
		const spendingPrice = parseFloat(
			(document.getElementById("price") as HTMLInputElement).value
		);
		const currentPrice = parseFloat(
			(
				await (
					await fetch(
						`https://finnhub.io/api/v1/quote?symbol=${selectedStock}&token=csn70hpr01qqapai5o6gcsn70hpr01qqapai5o70`
					)
				).json()
			).c
		);

		if (!isNaN(spendingPrice) && !isNaN(currentPrice)) {
			const amount = spendingPrice / currentPrice;

			try {
				const response = await fetch("/api/buyStock", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						symbol: selectedStock,
						amount: amount,
						spendingPrice: spendingPrice,
					}),
				});

				if (!response.ok) {
					alert("Insufficient Account Balance");
					window.location.reload();
				}

				// Update the local state for instant feedback
				setStockBalances((prevBalances) => ({
					...prevBalances,
					[selectedStock]: (prevBalances[selectedStock] || 0) + amount,
				}));

				closeModal();
			} catch (error) {
				console.error("Error buying stock:", error);
			}
		}
	};

	const sellStock = async () => {
        const selectedStock = (
            document.getElementById("category") as HTMLSelectElement
        ).value;
        const sellingPrice = parseFloat(
            (document.getElementById("price") as HTMLInputElement).value
        );
        const currentPrice = parseFloat(
            (
                await (
                    await fetch(
                        `https://finnhub.io/api/v1/quote?symbol=${selectedStock}&token=csn70hpr01qqapai5o6gcsn70hpr01qqapai5o70`
                    )
                ).json()
            ).c
        );
    
        if (!isNaN(sellingPrice) && !isNaN(currentPrice)) {
            const amount = sellingPrice / currentPrice;
    
            if ((stockBalances[selectedStock] || 0) < amount) {
                alert("Insufficient stock balance to sell");
                return;
            }
    
            try {
                // 1. Call the backend to sell the stock and update database
                const sellResponse = await fetch("/api/sellStock", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        symbol: selectedStock.toUpperCase(),
                        amount: amount,
                        sellingPrice: sellingPrice,
                    }),
                });
    
                if (!sellResponse.ok) {
                    throw new Error("Failed to sell stock");
                }
    
                // 2. Update the local state to reflect the new balance
                setStockBalances((prevBalances) => ({
                    ...prevBalances,
                    [selectedStock]: (prevBalances[selectedStock] || 0) - amount,
                }));
    
                // 3. Optionally, refresh stock prices or total balance if needed
                await fetchStockPrices();
    
                // Close modal after successful transaction
                closeModal();
    
            } catch (error) {
                console.error("Error selling stock:", error);
            }
        }
    };    

	return (
		<div className="p-6 bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">
			<div className="flex gap-12">
				<div className="mb-8 bg-white p-6 shadow-lg rounded-xl mt-6 w-full">
					<h2 className="text-xl font-semibold text-gray-800">Total Balance</h2>
					<p className="text-3xl font-bold text-indigo-600 mt-2">
						${total.toFixed(2)}
					</p>
					<p className="text-gray-500 mt-2">
						{Object.keys(stockBalances).length} Stocks in Portfolio
					</p>
					<div className="text-gray-500">
						{Object.entries(stockBalances).map(([stock, shares]) => (
							<div key={stock}>
								<span className="text-gray-500 uppercase">{stock}:</span>
								{shares} shares
							</div>
						))}
					</div>
					<div
						id="crud-modal"
						tabIndex={-1}
						aria-hidden="true"
						className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 hidden"
					>
						<div className="relative p-4 w-full max-w-md max-h-full">
							<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
								<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
										Buy/Sell Stock
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
								{/* <!-- Modal body --> */}
								<form className="p-4 md:p-5">
									<div className="grid gap-4 mb-4 grid-cols-2">
										<div className="col-span-2 sm:col-span-1">
											<label
												htmlFor="category"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												Select a stock
											</label>
											<select
												id="category"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
												onClick={calculatePrice}
											>
												{Object.keys(stockBalances).map((stock) => (
													<option key={stock} value={stock}>
														{stock}
													</option>
												))}
											</select>
										</div>
										<div className="col-span-2 sm:col-span-1">
											<label
												htmlFor="price"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												Spending Price
											</label>
											<input
												type="number"
												name="price"
												id="price"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
												placeholder="$1000"
												required
												onChange={calculatePrice}
											/>
										</div>

										<div id="price" className="col-span-2 ">
											<label
												htmlFor="description"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												Shares Amount
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
											onClick={() => buyStock()}
										>
											Buy Stock
										</button>
										<button
											type="button"
											className="w-full text-white flex items-center justify-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
											onClick={() => sellStock()}
										>
											Sell Stock
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
					<PieChart balances={stockPrices} />
				</div>
			</div>

			<div className="flex flex-col lg:flex-row gap-6">
				<div className="flex flex-col w-full lg:w-2/3 bg-white p-6 shadow-lg rounded-xl">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">
						Market Chart
					</h2>
					<Chart symbol={selectedStock} />
				</div>

				<div className="flex flex-col w-full lg:w-1/3 bg-white p-6 shadow-lg rounded-xl">
					<div className="flex flex-col">
						<div className="flex justify-between pb-4">
							<h2 className="text-xl font-semibold text-gray-800 mb-4">
								Select Stock
							</h2>
							<button
								className="border-2 py-2 px-4 rounded-lg hover:bg-indigo-600 hover:text-white transition"
								onClick={addNewStock}
							>
								Add
							</button>
						</div>
						<div className="space-y-3 flex flex-col">
							{Object.keys(stockBalances).map((stock) => (
								<div
									key={stock}
									onClick={() => setSelectedStock(stock)}
									className={`flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer`}
								>
									<p className="text-gray-700 font-medium">
										View {stock} Chart
									</p>
									<button
										className={`px-4 py-2 rounded-lg font-semibold text-sm ${
											selectedStock === stock
												? "bg-indigo-600 text-white"
												: "bg-indigo-50 text-indigo-600 border border-indigo-500 hover:bg-indigo-100"
										} transition duration-150`}
									>
										{stock}
									</button>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Stocks;
