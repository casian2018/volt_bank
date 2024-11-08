import React from 'react'
import Chart from './Chart'
import CryptoPieChart from './CryptoPieChart';

const Crypto = () => {
    const [selectedSymbol, setSelectedSymbol] = React.useState('BTCUSD');

    return (
        <div className='p-4 bg-gray-50 min-h-screen'>
            <div className='flex flex-col w-full lg:flex-row gap-4'>
                <div className='flex flex-col w-full lg:w-2/3 bg-white p-4 shadow-md rounded-lg'>
                    <Chart symbol={selectedSymbol} />
                </div>

                <div className='flex flex-col w-full lg:w-1/3 bg-white p-4 shadow-md rounded-lg'>
                    {['BTCUSD', 'ETHUSD', 'LTCUSD', 'XRPUSD'].map((symbol) => (
                        <div key={symbol} className='flex flex-row justify-between items-center bg-gray-100 border rounded p-2 mb-2'>
                            <p className='text-gray-500 text-lg'>
                                View the {symbol} chart:
                            </p>
                            <button
                                onClick={() => setSelectedSymbol(symbol)}
                                className={`flex justify-center items-center bg-indigo-500 text-white p-2 m-2 border rounded hover:bg-indigo-600 transition duration-200 ${
                                    selectedSymbol === symbol ? 'bg-indigo-600' : ''
                                }`}
                            >
                                {symbol}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-4 bg-white p-4 shadow-md rounded-lg'>
                <CryptoPieChart />
            </div>
        </div>
    );
}

export default Crypto
