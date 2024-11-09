"use client";

import { useState, useEffect, FormEvent } from 'react';

export default function Transfer() {
  const [senderEmail, setSenderEmail] = useState<string>(''); // Type inferred as string
  const [receiverEmail, setReceiverEmail] = useState<string>(''); // Type inferred as string
  const [amount, setAmount] = useState<number>(0); // Type inferred as number
  const [message, setMessage] = useState<string | null>(null); // Explicit type for message

  // Fetch logged-in user's email from the backend API
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await fetch('/api/getUser', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // or session/cookies
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSenderEmail(data.user.email); // Set the logged-in user's email
        } else {
          console.error('Failed to fetch user email');
        }
      } catch (error) {
        console.error('Error fetching user email', error);
      }
    };

    fetchUserEmail();
  }, []);

  const handleTransfer = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderEmail, receiverEmail, amount }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Transfer successful');
      } else {
        setMessage(`Transfer failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error in transfer:', error);
      setMessage('Transfer failed');
    }
  };

  return (
    <div className="font-manrope flex w-full items-center justify-center">
      <form className="mx-auto box-border border bg-white p-4" onSubmit={handleTransfer}>
        <div className="flex items-center justify-between">
          <span className="text-[#64748B] text-lg font-bold">Sending Money</span>
        </div>

        <div className="font-semibold hidden">Sender:</div>
        {/* The sender's email input, set to readOnly */}
        <div>
          <input
            className="mt-1 w-full hidden rounded-[4px] border border-[#A0ABBB] p-2"
            value={senderEmail}
            type="email"
            readOnly
            required
          />
        </div>

        <div className="mt-6">
          <div className="font-semibold">Money:</div>
          <div>
            <input
              className="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="font-semibold">To Who:</div>
          <div>
            <input
              className="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"
              type="email"
              placeholder="Receiver Email"
              value={receiverEmail}
              onChange={(e) => setReceiverEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <button className="w-full cursor-pointer rounded-[4px] bg-green-700 px-3 py-[6px] text-center font-semibold text-white" type="submit">
            Transfer
          </button>
          {message && <p>{message}</p>}
        </div>
      </form>
    </div>
  );
}
