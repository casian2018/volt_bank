import Image from "next/image";
import logo from "../../images/logo.png";
import { useEffect, useState } from "react";

const Card = () => {
  // Capitalize the component name
  return (
    <div>
      <div className="w-10 mt-4 flex justify-center items-center m-auto">
        {" "}
        <Image src={logo} alt="plm"></Image>{" "}
      </div>
      <div className="bg-white mt-6 flex justify-center items-center">
        <div className="space-y-16">
          <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
            <img
              className="relative object-cover w-full h-full rounded-xl"
              src="https://i.imgur.com/kGkSg1v.png"
            />
            <div className="w-full px-8 absolute top-8">
              <div className="flex justify-between">
                <div className="">
                  <p className="font-semibold">Name</p>
                  <p className="font-s tracking-widest">Karthik P</p>
                </div>
                <img
                  className="w-14 h-14"
                  src="https://i.imgur.com/bbPHJVe.png"
                />
              </div>
              <div className="pt-1">
                <p className="font-semibold">Card Number</p>
                <p className="font-s tracking-more-wider ">
                  4642 3489 9867 7632
                </p>
              </div>
              <div className="pt-6 pr-6">
                <div className="flex justify-between">
                  <div className="">
                    <p className="font-semibold text-xs">Valid</p>
                    <p className="font-s tracking-wider text-sm">11/15</p>
                  </div>
                  <div className="">
                    <p className="font-semibold text-xs ">Expiry</p>
                    <p className="font-medium tracking-wider text-sm">03/25</p>
                  </div>

                  <div className="">
                    <p className="font-semibold text-xs">CVV</p>
                    <p className="font-bold tracking-more-wider text-sm">···</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
            <img
              className="relative object-cover w-full h-full rounded-xl"
              src="https://i.imgur.com/Zi6v09P.png"
            />
            <div className="w-full px-8 absolute top-8">
              <div className="flex justify-between">
                <div className="">
                  <p className="font-semibold">Name</p>
                  <p className="font-s tracking-widest">Karthik P</p>
                </div>
                <img
                  className="w-14 h-14"
                  src="https://i.imgur.com/bbPHJVe.png"
                />
              </div>
              <div className="pt-1">
                <p className="font-semibold">Card Number</p>
                <p className="font-s tracking-more-wider">
                  4642 3489 9867 7632
                </p>
              </div>
              <div className="pt-6 pr-6">
                <div className="flex justify-between">
                  <div className="">
                    <p className="font-semibold text-xs">Valid</p>
                    <p className="font-medium tracking-wider text-sm">11/15</p>
                  </div>
                  <div className="">
                    <p className="font-semibold text-xs ">Expiry</p>
                    <p className="font-medium tracking-wider text-sm">03/25</p>
                  </div>

                  <div className="">
                    <p className="font-semibold text-xs">CVV</p>
                    <p className="font-bold tracking-more-wider text-sm">···</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card; // Use default export here
