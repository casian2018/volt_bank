import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import PieChart from './PieChart';
import AssetBalance from './AssetBalance';



const Crypto = () => {
    const [selectedSymbol, setSelectedSymbol] = useState('BTCUSD');
    
    const cryptoBalances = {
        bitcoin: 0.7,
        ethereum: 2.0,
        litecoin: 10.0,
        ripple: 1000.0
        };
    

    return (
        <div className="p-6 bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">
            <div className=' flex gap-12 '>
            <div className="mb-8 bg-white p-6 shadow-lg rounded-xl mt-6 w-full">
                <h2 className="text-xl font-semibold text-gray-800">Total Balance</h2>
                <AssetBalance cryptoBalances={cryptoBalances} />
                
            </div>

            <div className="mt-6 bg-white p-6 shadow-lg rounded-xl w-fit mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Portfolio Allocation</h2>
                <PieChart />
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
}

export default Crypto;
