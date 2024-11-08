"use client";

export default function registerPage() {
    return (
        <>
            <div className="h-screen flex">
                <div
                    className="lg:flex w-full lg:w-1/2 login_img_section
                    justify-around items-center"
                >
                    <div
                        className=" 
                                    bg-black 
                                    opacity-20 
                                    inset-0 
                                    z-0"
                    ></div>
                    <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
                        <h1 className="text-white font-bold text-4xl font-sans">
                            Volt Bank
                        </h1>
                        <p className="text-white mt-1">Volt Bank is a digital bank offering streamlined accounts, smart financial tools, and fast online banking for easy money management.</p>
                        
                    </div>
                </div>
                <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
                    <div className="w-full px-8 md:px-32 lg:px-24">
                        <form className="bg-white rounded-md shadow-2xl p-5">
                            <h1 className="text-gray-800 font-bold text-2xl mb-1">
                                Welcome to Simple App!
                            </h1>
                            <p className="text-sm font-normal text-gray-600 mb-8">
                                Create an account
                            </p>
                            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5.121 17.804A4.992 4.992 0 0112 15c1.657 0 3.156.672 4.121 1.804M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4z"
                                    />
                                </svg>
                                <input
                                    id="name"
                                    className="pl-2 w-full outline-none border-none"
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                />
                            </div>

                            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                                <input
                                    id="email"
                                    className="pl-2 w-full outline-none border-none"
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                />
                            </div>
                            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 10a1 1 0 011-1h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V10z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 10V7a5 5 0 0110 0v3"
                                    />
                                </svg>
                                <input
                                    id="phone"
                                    className="pl-2 w-full outline-none border-none"
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number"
                                />
                            </div>
                            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 10h10M7 14h10M7 18h10"
                                    />
                                </svg>
                                <input
                                    id="address"
                                    className="pl-2 w-full outline-none border-none"
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                />
                            </div>
                            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 2a10 10 0 100 20 10 10 0 000-20z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 6v6l4 2"
                                    />
                                </svg>
                                <input
                                    id="city"
                                    className="pl-2 w-full outline-none border-none"
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                />
                            </div>
                            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 2v4M16 2v4M4 10h16"
                                    />
                                </svg>
                                <input
                                    id="country"
                                    className="pl-2 w-full outline-none border-none"
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                />
                            </div>
                            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 7a4 4 0 118 0v4a4 4 0 11-8 0V7z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 14v2m0 4h.01"
                                    />
                                </svg>
                                <input
                                    id="age"
                                    className="pl-2 w-full outline-none border-none"
                                    type="date"
                                    name="birth_date"
                                    placeholder="Birth Date"
                                />
                            </div>

                            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <input
                                    className="pl-2 w-full outline-none border-none"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                />
                            </div>
                            <button
                                className="bg-indigo-800 text-white w-full py-2 rounded-2xl"
                                type="submit"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
