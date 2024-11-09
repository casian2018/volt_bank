"use client";


import { useState } from 'react';

export default function TransferForm() {
  const [senderEmail, setSenderEmail] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);

  const handleTransfer = async (e: React.FormEvent) => {
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
    <form onSubmit={handleTransfer}>
      <input
        type="email"
        placeholder="Sender Email"
        value={senderEmail}
        onChange={(e) => setSenderEmail(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Receiver Email"
        value={receiverEmail}
        onChange={(e) => setReceiverEmail(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        required
      />
      <button type="submit">Transfer</button>
      {message && <p>{message}</p>}
    </form>
  );
}
