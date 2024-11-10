"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Nav from "@/components/nav";
import Forex from "@/components/Forex";
import Footer from "@/components/footer";

export default function ForexPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/checkAuth", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensure cookies are sent with the request
        });

        if (!response.ok) {
          throw new Error("Not authenticated");
        }

        setLoading(false); // User is authenticated, proceed with page load
      } catch (err) {
        setError("You need to log in.");
        router.push("/login"); // Redirect to login page if not authenticated
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">{error}</p>;

  return (
    <div>
      <Nav />
      <div className="pt-24">
        <Forex />
      </div>
      <Footer />
    </div>
  );
}
