
import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import CryptoPieChart from './PieChart';


interface ForexRates {
    [key: string]: number; 
}

const Forex = () => {
    const [selectedPair, setSelectedPair] = useState('EURUSD');
    const [forexRates, setForexRates] = useState<ForexRates>({});
    const [portfolio] = useState({ EUR: 1000, GBP: 2000 }); 

    const fetchForexRates = async () => {
        try {
            const rates = await fetch('/api/getForexPrices').then(res => res.json());
            setForexRates(rates);
        } catch (error) {
            console.error('Error fetching forex rates:', error);
        }
    };

    useEffect(() => {
        fetchForexRates();
    }, []);

    const totalBalance = Object.entries(portfolio).reduce((acc, [currency, amount]) => {
        const rate = forexRates[`${currency}USD`] || 1;
        return acc + rate * amount;
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
                        {Object.keys(portfolio).length} Currencies in Portfolio
                    </p>
                    <p className="text-gray-500"> 
                        {Object.entries(portfolio).map(([currency, amount]) => (
                            <span key={currency} className="text-gray-500">
                                {currency}: {amount} <br />
                            </span>
                        ))}
                    </p>
                </div>

                <div className="mt-6 bg-white p-6 shadow-lg rounded-xl w-fit mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Portfolio Allocation</h2>
                    <CryptoPieChart />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex flex-col w-full lg:w-2/3 bg-white p-6 shadow-lg rounded-xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Market Chart</h2>
                    <Chart symbol={selectedPair} />
                </div>

                <div className="flex flex-col w-full lg:w-1/3 bg-white p-6 shadow-lg rounded-xl">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Currency Pair</h2>
                    <div className="space-y-3">
                        {['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD'].map((pair) => (
                            <div
                                key={pair}
                                onClick={() => setSelectedPair(pair)}
                                className={`flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer `}
                            >
                                <p className="text-gray-700 font-medium ">
                                    View {pair} Chart
                                </p>
                                <button
                                    className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                                        selectedPair === pair
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-indigo-50 text-indigo-600 border border-indigo-500 hover:bg-indigo-100'
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
}

export default Forex;