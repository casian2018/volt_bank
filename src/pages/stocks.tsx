"use client";
import { useState } from "react";
import Nav from "@/components/nav";
import Stocks from "@/components/Stocks";
import Footer from "@/components/footer";

export default function CryptoPage() {
    return (
        <div>
            <Nav />
            <div className="pt-24">
            <Stocks/>
            </div>
            <Footer />
        </div>
    );
}
