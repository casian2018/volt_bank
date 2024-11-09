"use client";
import { useState } from "react";
import Nav from "@/components/nav";
import Forex from "@/components/Forex";
import Footer from "@/components/footer";

export default function ForexPage() {
    return (
        <div>
            <Nav />
            <div className="pt-24">
            <Forex/>
            </div>
            <Footer />
        </div>
    );
}