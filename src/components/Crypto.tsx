import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import PieChart from './PieChart';

const Crypto = () => {
    const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');
    const [total, setTotal] = useState(0);
    const cryptoBalances = {
        BTCUSDT: 0.7,
    };

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const Symbol = selectedSymbol; // Extract the symbol part (e.g., BTC from BTCUSD)
                const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${Symbol}`);
                const data = await response.json();
                const price = parseFloat(data.price);
                const balance = (cryptoBalances as any)[Symbol] || 0;
                setTotal(price * balance);
            } catch (error) {
                console.error('Error fetching price:', error);
            }
        };

        fetchPrice();
    }, [selectedSymbol]);

    return (
        <div className="p-6 bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">
            <div className='flex gap-12'>
                <div className='w-1/2'>
                    <div className="bg-white p-6 shadow-lg rounded-xl">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Asset Allocation</h2>
                        <PieChart />
                    </div>
                </div>
                <div className='w-1/2'>
                    <div className="bg-white p-6 shadow-lg rounded-xl">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Asset Balance</h2>
                        <p className="text-gray-600 text-sm mb-4">Your current balance is ${total.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            {/* Chart and Crypto Selector */}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex flex-col w-full lg:w-2/3 bg-white p-6 shadow-lg rounded-xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Market Chart</h2>
                    <Chart symbol={selectedSymbol} />
                </div>

                <div className="flex flex-col w-full lg:w-1/3 bg-white p-6 shadow-lg rounded-xl">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Cryptocurrency</h2>
                    <div className="space-y-3">
                        {['BTCUSD', 'ETHUSD', 'LTCUSD', 'XRPUSD'].map((symbol) => (
                            <div
                                key={symbol}
                                onClick={() => setSelectedSymbol(symbol)}
                                className={`flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer `}
                            >
                                <p className="text-gray-700 font-medium ">
                                    View {symbol} Chart
                                </p>
                                <button
                                    className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                                        selectedSymbol === symbol
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-indigo-50 text-indigo-600 border border-indigo-500 hover:bg-indigo-100'
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
