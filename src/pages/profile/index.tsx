"use client";

export default function ProfilePage() {
    return(    
            <main className="container mx-w-6xl mx-auto py-4">
        <div className="flex flex-col space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 px-4 xl:p-0 gap-y-4 md:gap-6">
                <div className="md:col-span-2 xl:col-span-3 bg-white p-6 rounded-2xl border border-gray-50">
                    <div className="flex flex-col space-y-6 md:h-full md:justify-between">
                        <div className="flex justify-between">
                            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                                Main Account
                            </span>
                            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                                Available Funds
                            </span>
                        </div>
                        <div className="flex gap-2 md:gap-4 justify-between items-center">
                            <div className="flex flex-col space-y-4">
                                <h2 className="text-gray-800 font-bold tracking-widest leading-tight">Derol's Savings
                                    Account</h2>
                                <div className="flex items-center gap-4">
                                    <p className="text-lg text-gray-600 tracking-wider">**** **** *321</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-lg md:text-xl xl:text-3xl text-gray-700 font-black tracking-wider">
                                <span className="md:text-xl">$</span>
                                92,817.45
                            </h2>
                        </div>
                        <div className="flex gap-2 md:gap-4">
                            <a href="#"
                                className="bg-blue-600 px-5 py-3 w-full text-center md:w-auto rounded-lg text-white text-xs tracking-wider font-semibold hover:bg-blue-800">
                                Transfer Money
                            </a>
                            <a href="#"
                                className="bg-blue-50 px-5 py-3 w-full text-center md:w-auto rounded-lg text-blue-600 text-xs tracking-wider font-semibold hover:bg-blue-600 hover:text-white">
                                Link Account
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    className="col-span-2 p-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-800 flex flex-col justify-between">
                    <div className="flex flex-col">
                        <p className="text-white font-bold">Lorem ipsum dolor sit amet</p>
                        <p className="mt-1 text-xs md:text-sm text-gray-50 font-light leading-tight max-w-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio soluta saepe consequuntur
                            facilis ab a. Molestiae ad saepe assumenda praesentium rem dolore? Exercitationem, neque
                            obcaecati?
                        </p>
                    </div>
                    <div className="flex justify-between items-end">
                        <a href="#"
                            className="bg-blue-800 px-4 py-3 rounded-lg text-white text-xs tracking-wider font-semibold hover:bg-blue-600 hover:text-white">
                            Learn More
                        </a>
                        <img src="https://atom.dzulfarizan.com/assets/calendar.png" alt="calendar" className="w-auto h-24 object-cover" />
                    </div>
                </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 xl:p-0 gap-4 xl:gap-6">
                <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-between">
                    <h2 className="text-xs md:text-sm text-gray-700 font-bold tracking-wide md:tracking-wider">
                        Expenses By Category</h2>
                    <a href="#" className="text-xs text-gray-800 font-semibold uppercase">More</a>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-50">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="text-xs text-gray-600 tracking-wide">Foods & Beverages</p>
                            <h3 className="mt-1 text-lg text-blue-500 font-bold">$ 818</h3>
                            <span className="mt-4 text-xs text-gray-500">Last Transaction 3 Hours ago</span>
                        </div>
                        <div className="bg-blue-500 p-2 md:p-1 xl:p-2 rounded-md">
                            <img src="https://atom.dzulfarizan.com/assets/dish-2.png" alt="icon" className="w-auto h-8 md:h-6 xl:h-8 object-cover" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-50">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="text-xs text-gray-600 tracking-wide">Groceries</p>
                            <h3 className="mt-1 text-lg text-green-500 font-bold">$ 8,918</h3>
                            <span className="mt-4 text-xs text-gray-500">Last Transaction 3 Days ago</span>
                        </div>
                        <div className="bg-green-500 p-2 md:p-1 xl:p-2 rounded-md">
                            <img src="https://atom.dzulfarizan.com/assets/grocery.png" alt="icon" className="w-auto h-8 md:h-6 xl:h-8 object-cover" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-50">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="text-xs text-gray-600 tracking-wide">Gaming</p>
                            <h3 className="mt-1 text-lg text-yellow-500 font-bold">$ 1,223</h3>
                            <span className="mt-4 text-xs text-gray-600">Last Transaction 4 Days ago</span>
                        </div>
                        <div className="bg-yellow-500 p-2 md:p-1 xl:p-2 rounded-md">
                            <img src="https://atom.dzulfarizan.com/assets/gaming.png" alt="icon" className="w-auto h-8 md:h-6 xl:h-8 object-cover" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-50">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="text-xs text-gray-600 tracking-wide">Trip & Holiday</p>
                            <h3 className="mt-1 text-lg text-indigo-500 font-bold">$ 5,918</h3>
                            <span className="mt-4 text-xs text-gray-500">Last Transaction 1 Month ago</span>
                        </div>
                        <div className="bg-indigo-500 p-2 md:p-1 xl:p-2 rounded-md">
                            <img src="https://atom.dzulfarizan.com/assets/holiday.png" alt="icon" className="w-auto h-8 md:h-6 xl:h-8 object-cover" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
                <div className="col-start-1 col-end-5">
                    <h2 className="text-xs md:text-sm text-gray-800 font-bold tracking-wide">Summary Transactions</h2>
                </div>
                <div className="col-span-2 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 flex justify-between items-center">
                        <div className="p-4 cursor-pointer border">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between items-center">
                            <h2 className="text-gray-800 font-bold tracking-wider">$ 27.80</h2>
                        </div>
                        <div className="p-4 cursor-pointer border">
                            <span className="text-xs text-gray-500 font-semibold">Weekly</span>
                            <h2 className="text-gray-800 font-bold tracking-wider">$ 192.92</h2>
                        </div>
                        <div className="p-4 cursor-pointer border">
                            <span className="text-xs text-gray-500 font-semibold">Monthly</span>
                            <h2 className="text-gray-800 font-bold tracking-wider">$ 501.10</h2>
                        </div>
                    </div>
                    <canvas id="myChart"></canvas>
                </div>
                <div className="col-span-3 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-sm text-gray-600 font-bold tracking-wide">Latest Transactions</h2>
                        <a href="#"
                            className="px-4 py-2 text-xs bg-blue-100 text-blue-500 rounded uppercase tracking-wider font-semibold hover:bg-blue-300">More</a>
                    </div>
                    <ul className="divide-y-2 divide-gray-100 overflow-x-auto w-full">
                        <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                            <p className="px-4 font-semibold">Today</p>
                            <p className="px-4 text-gray-600">McDonald</p>
                            <p className="px-4 tracking-wider">Cash</p>
                            <p className="px-4 text-blue-600">Food</p>
                            <p className="md:text-base text-gray-800 flex items-center gap-2">
                                16.90
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </p>
                        </li>
                        <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                            <p className="px-4 font-semibold">Today</p>
                            <p className="px-4 text-gray-600">McDonald</p>
                            <p className="px-4 tracking-wider">Cash</p>
                            <p className="px-4 text-blue-600">Food</p>
                            <p className="md:text-base text-gray-800 flex items-center gap-2">
                                16.90
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </p>
                        </li>
                        <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                            <p className="px-4 font-semibold">Today</p>
                            <p className="px-4 text-gray-600">McDonald</p>
                            <p className="px-4 tracking-wider">Cash</p>
                            <p className="px-4 text-blue-600">Food</p>
                            <p className="md:text-base text-gray-800 flex items-center gap-2">
                                16.90
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </p>
                        </li>
                        <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                            <p className="px-4 font-semibold">Today</p>
                            <p className="px-4 text-gray-600">McDonald</p>
                            <p className="px-4 tracking-wider">Cash</p>
                            <p className="px-4 text-blue-600">Food</p>
                            <p className="md:text-base text-gray-800 flex items-center gap-2">
                                16.90
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </p>
                        </li>
                        <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                            <p className="px-4 font-semibold">Today</p>
                            <p className="px-4 text-gray-600">McDonald</p>
                            <p className="px-4 tracking-wider">Cash</p>
                            <p className="px-4 text-blue-600">Food</p>
                            <p className="md:text-base text-gray-800 flex items-center gap-2">
                                16.90
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </p>
                        </li>
                        <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                            <p className="px-4 font-semibold">Today</p>
                            <p className="px-4 text-gray-600">McDonald</p>
                            <p className="px-4 tracking-wider">Cash</p>
                            <p className="px-4 text-blue-600">Food</p>
                            <p className="md:text-base text-gray-800 flex items-center gap-2">
                                16.90
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </p>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </main>
        );
    }