"use client";
import { useState } from 'react';

export default function Nav() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isTransactionsOpen, setTransactionsOpen] = useState(false);

    return (

        <>
        <nav className="p-4 md:py-8 xl:px-0 md:container md:max-w-6xl md:mx-auto">
            <div className="hidden lg:flex lg:justify-between lg:items-center">
                <a href="#" className="flex items-start gap-2 group">
                    <div className="bg-blue-600 text-white p-2 rounded-md group-hover:bg-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p className="text-sm font-light uppercase">
                        Dashboard
                        <span className="text-base block font-bold tracking-widest">Atom</span>
                    </p>
                </a>

                <ul className="flex items-center space-x-4 text-sm font-semibold">
                    <li><a href="#" className="px-2 xl:px-4 py-2 text-gray-800 rounded-md hover:bg-gray-200">My Account</a></li>
                    <li className="relative">
                        <button onClick={() => setTransactionsOpen(!isTransactionsOpen)} className="px-2 xl:px-4 py-2 text-gray-600 rounded-md hover:bg-gray-200 flex gap-2 items-center">
                            Transactions
                            <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 stroke-current stroke-2 text-gray-800 transform duration-500 ${isTransactionsOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        {isTransactionsOpen && (
                            <ul className="absolute top-10 left-0 bg-white p-4 rounded-md shadow overflow-hidden w-64">
                                <li><a href="#" className="p-4 block text-sm text-gray-600 rounded flex items-center gap-2 hover:bg-gray-100">Transaction ABC</a></li>
                                <li><a href="#" className="p-4 block text-sm text-gray-600 rounded flex items-center gap-2 hover:bg-gray-100">Transaction DEF</a></li>
                                <li><a href="#" className="p-4 block text-sm text-gray-600 rounded flex items-center gap-2 hover:bg-gray-100">Transaction GHI</a></li>
                            </ul>
                        )}
                    </li>
                    <li><a href="#" className="px-2 xl:px-4 py-2 text-gray-600 rounded-md hover:bg-gray-200">Cards</a></li>
                    <li><a href="#" className="px-2 xl:px-4 py-2 text-gray-600 rounded-md hover:bg-gray-200">Offers</a></li>
                </ul>

                <ul className="flex space-x-2 xl:space-x-4 text-sm font-semibold">
                    {/* Icons */}
                    <li><a href="#"><div className="p-2 rounded hover:bg-gray-200"><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 stroke-current text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"> {/* Icon paths */} </svg></div></a></li>
                    {/* Add more icons as needed */}
                </ul>
            </div>

            <div className="lg:hidden relative flex justify-between w-full">
                <a href="#" className="flex items-start gap-2 group">
                    <div className="bg-blue-600 text-white p-3 rounded-md group-hover:bg-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p className="text-sm font-light uppercase">
                        Dashboard
                        <span className="text-base block font-bold tracking-widest">Atom</span>
                    </p>
                </a>
                <button onClick={() => setMenuOpen(!isMenuOpen)} type="button" className="bg-gray-200 p-3 rounded-md">
                    <svg className={`h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    <svg className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {isMenuOpen && (
                    <div className="absolute top-14 left-0 right-0 w-full bg-white rounded-md border">
                        <ul className="p-4">
                            <li className="px-4 py-2 rounded hover:bg-gray-200"><a href="#" className="flex items-center gap-4">My Account</a></li>
                            <li className="px-4 py-2 rounded hover:bg-gray-200"><a href="#" className="flex items-center gap-4">Transactions</a></li>
                            <li className="px-4 py-2 rounded hover:bg-gray-200"><a href="#" className="flex items-center gap-4">Cards</a></li>
                            <li className="px-4 py-2 rounded hover:bg-gray-200"><a href="#" className="flex items-center gap-4">Offers</a></li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
        

   <div className='flex items-center justify-center mt-24 mb-36'>

        <div className='flex items-center gap-44'>

            <div>
          <h1 className='text-4xl mb-3 font-bold font-serif'>Welcome to VoltBank !</h1>
           <h2 className='text-xl'>An innovative, built banking system to meet one's  <br/> needs fast financial environment and in <br></br> continuous change everywhere.</h2>
           </div>

           <img src='imgbani.webp' className='w-[350px] rounded-lg h-[300px]'/>

        </div>

        </div>



    
        <div  className='flex items-center justify-center gap-16 mb-32'>
        <img src='imgbani.webp' className='w-[340px] rounded-lg h-[300px]'/>

            <h1 className='text-lg font-medium'>Whether you're a seasoned crypto investor or a newcomer to the world of <br/> digital currencies, VoltBank offers the tools and resources you need to <br/> trade, exchange, and grow your wealth.With advanced market insights, <br/> real-time analytics, and personalized trading tactics,we empower you <br/> to make informed decisions and maximize your potential <br/> in crypto market.</h1>
        </div>

        
        <div  className='flex items-center justify-center gap-16 mb-24'>
            <h1 className='text-lg font-medium'>At VoltBank, we prioritize your financial success by providing a secure <br/> platform tailored to your needs. Our intuitive interface, combined with <br/> robust risk management tools and 24/7 customer support, ensures a <br/> seamless trading experience. Stay ahead with cutting-edge analytics, <br/> exclusive market updates, and insights crafted to help you make <br/> confident, data-driven choices. Unlock new possibilities in both <br/> crypto and forex with VoltBank’s reliable and innovative <br/> financial solutions.</h1>
            <img src='btkimg.webp' className='w-[340px] rounded-lg h-[300px]'/>

        </div>




        <h1 className='text-center text-3xl font-bold mb-11'>Track Partners</h1>



        <div className='flex flex-col '>

            <div className='flex justify-center gap-32'>
            <img src='haufe.png' className='w-[200px]'/>
            <img src='nokia.png' className='w-[200px]'/>
            <img src='access.png' className='w-[200px]'/>
            </div>

            <div className='flex justify-center gap-32'>
            <img src='faber.png' className='w-[200px]'/>
            <img src='tm.png' className='w-[200px]'/>
            <img src='pebune.png' className='w-[200px]'/>
            </div>


        </div>


        <section id="testimonials" aria-label="What our customers are saying" className="bg-slate-50 py-20 sm:py-32">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-2xl md:text-center">
      <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">What Our Customers Are Saying</h2>
    </div>
    <ul role="list"
      className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
      <li>
        <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
          <li>
            <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10"><svg aria-hidden="true"
                width="105" height="78" className="absolute left-6 top-6 fill-slate-100">
                <path
                  d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z">
                </path>
              </svg>
              <blockquote className="relative">
                <p className="text-lg tracking-tight text-slate-900">

                As a business professional, I rely on high-quality financial services to manage my accounts. This bank offers a great selection of top-notch solutions.
                 </p>
              </blockquote>
              <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                <div>
                  <div className="font-display text-base text-slate-900">Sheryl Berge</div>
                </div>
                <div className="overflow-hidden rounded-full bg-slate-50">
                  <img alt="" className="h-14 w-14 object-cover" src="https://randomuser.me/api/portraits/men/15.jpg" />
                </div>
              </figcaption>
            </figure>
          </li>
        </ul>
      </li>
      <li>
        <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
          <li>
            <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10"><svg aria-hidden="true"
                width="105" height="78" className="absolute left-6 top-6 fill-slate-100">
                <path
                  d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z">
                </path>
              </svg>
              <blockquote className="relative">
                <p className="text-lg tracking-tight text-slate-900">

As a business professional, I rely on high-quality financial services to manage my accounts. This bank offers a great selection of top-notch solutions.
           </p>
              </blockquote>
              <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                <div>
                  <div className="font-display text-base text-slate-900">Leland Kiehn</div>
                </div>
                <div className="overflow-hidden rounded-full bg-slate-50">
                  <img alt="" className="h-14 w-14 object-cover" src="https://randomuser.me/api/portraits/women/15.jpg" />
                </div>
              </figcaption>
            </figure>
          </li>
        </ul>
      </li>
      <li>
        <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
          <li>
            <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10"><svg aria-hidden="true"
                width="105" height="78" className="absolute left-6 top-6 fill-slate-100">
                <path
                  d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z">
                </path>
              </svg>
              <blockquote className="relative">
                <p className="text-lg tracking-tight text-slate-900">
                The banking services I received here fit my needs perfectly and make managing my finances a breeze. I highly recommend this bank to anyone looking for quality service.
</p>
              </blockquote>
              <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                <div>
                  <div className="font-display text-base text-slate-900">Peter Renolds</div>
                </div>
                <div className="overflow-hidden rounded-full bg-slate-50">
                  <img className="h-14 w-14 object-cover" src="https://randomuser.me/api/portraits/men/10.jpg"/>
                </div>
              </figcaption>
            </figure>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</section>

        
    

        </>

        
    );

   
}
