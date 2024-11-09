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
    


<div className="font-manrope flex h-screen w-full items-center justify-center">
  <form className="mx-auto box-border w-[365px] border bg-white p-4" onSubmit={handleTransfer}>
    <div className="flex items-center justify-between">
      <span className="text-[#64748B]">Sending Money</span>
      <div className="cursor-pointer border rounded-[4px]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>

    <div className="font-semibold">cn trimite?</div>
      <div><input className="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2" value={senderEmail} type="email"  onChange={(e) => setSenderEmail(e.target.value)}
        required/></div>

    <div className="mt-6">
      

      <div className="font-semibold">cat ai chef sa trimiti?</div>
      <div><input className="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"    type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        required /></div>
      
    </div>

    <div className="mt-6">
      <div className="font-semibold">From</div>
      <div className="mt-2">
        <div className="flex w-full items-center justify-between bg-neutral-100 p-3 rounded-[4px]">
          <div className="flex items-center gap-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#299D37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">Checking</span>
          </div>

          <div className="flex items-center gap-x-2">
            <div className="text-[#64748B]">card ending in 6678</div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-6">
     

      <div className="font-semibold">cn primeste?</div>
      <div><input className="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"  type="email"
        placeholder="Receiver Email"
        value={receiverEmail}
        onChange={(e) => setReceiverEmail(e.target.value)}
        required/></div>
    </div>

    <div className="mt-6">
      <button className="w-full cursor-pointer rounded-[4px] bg-green-700 px-3 py-[6px] text-center font-semibold text-white" type="submit">transfer</button>
      {message && <p>{message}</p>}
    </div>
  </form>

  
</div>
  );
}
