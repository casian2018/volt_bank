"use client";
import { useState } from "react";
import Nav from "@/components/nav";
import Crypto from "@/components/Crypto";
import Footer from "@/components/footer";

export default function CryptoPage() {
    return (
        <div>
            <Nav />
            <div className="pt-24">
            <Crypto/>
            </div>
            <Footer />
        </div>
    );
}
