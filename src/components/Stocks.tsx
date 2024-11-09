import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import PieChart from './PieChart';

interface StockPrices {
    [key: string]: number; 
}

const Stocks = () => {
    const [selectedStock, setSelectedStock] = useState('AAPL');
    const [stockPrices, setStockPrices] = useState<StockPrices>({});
    const [portfolio] = useState({ AAPL: 10, MSFT: 5 }); 

    const fetchStockPrices = async () => {
        try {
            const prices = await fetch('/api/getStockPrices').then(res => res.json());
            setStockPrices(prices);
        } catch (error) {
            console.error('Error fetching stock prices:', error);
        }
    };

    useEffect(() => {
        fetchStockPrices();
    }, []);

    const totalBalance = Object.entries(portfolio).reduce((acc, [stock, shares]) => {
        const price = stockPrices[stock] || 0;
        return acc + price * shares;
    }, 0);

    return (
        <div className="p-6 bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">
            <div className='flex gap-12'>
                <div className="mb-8 bg-white p-6 shadow-lg rounded-xl mt-6 w-full">
                    <h2 className="text-xl font-semibold text-gray-800">Total Balance</h2>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ${totalBalance.toFixed(2)}
                    </p>
                    <p className="text-gray-500 mt-2">
                        {Object.keys(portfolio).length} Stocks in Portfolio
                    </p>
                    <p className="text-gray-500"> 
                        {Object.entries(portfolio).map(([stock, shares]) => (
                            <span key={stock} className="text-gray-500">
                                {stock}: {shares} shares <br />
                            </span>
                        ))}
                    </p>
                </div>

                <div className="mt-6 bg-white p-6 shadow-lg rounded-xl w-fit mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Portfolio Allocation</h2>
                    <PieChart />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex flex-col w-full lg:w-2/3 bg-white p-6 shadow-lg rounded-xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Market Chart</h2>
                    <Chart symbol={selectedStock} />
                </div>

                <div className="flex flex-col w-full lg:w-1/3 bg-white p-6 shadow-lg rounded-xl">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Stock</h2>
                    <div className="space-y-3">
                        {['AAPL', 'MSFT', 'GOOGL', 'AMZN'].map((stock) => (
                            <div
                                key={stock}
                                onClick={() => setSelectedStock(stock)}
                                className={`flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer `}
                            >
                                <p className="text-gray-700 font-medium ">
                                    View {stock} Chart
                                </p>
                                <button
                                    className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                                        selectedStock === stock
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-indigo-50 text-indigo-600 border border-indigo-500 hover:bg-indigo-100'
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
    );
}

export default Stocks;