import React, { useState, useEffect } from 'react';

export default function AddSavings() {
    const [balance, setBalance] = useState(0);
    const [savings, setSavings] = useState(0);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        fetch('/api/getUser')
            .then(response => response.json())
            .then(data => {
                if (data.user) {
                    setBalance(data.user.balance);
                    setSavings(data.user.savings);
                } else {
                    console.error('User data not found');
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleAddSavings = () => {
        if (amount > balance) {
            alert('Amount exceeds balance');
            return;
        }

        const newBalance = balance - amount;
        const newSavings = savings + amount;

        fetch('/api/getUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ balance: newBalance, savings: newSavings }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'User data updated successfully') {
                    setBalance(newBalance);
                    setSavings(newSavings);
                } else {
                    console.error('Error updating user data:', data.message);
                }
            })
            .catch(error => {
                console.error('Error updating user data:', error);
            });
    };

    return (
        <div className="transfer-container flex w-full items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Transfer to Savings</h2>
                
                <div className="balance-info mb-4 text-gray-500 font-medium">
                    <p>Balance: <span className="text-gray-700">${balance.toFixed(2)}</span></p>
                    <p>Savings: <span className="text-gray-700">${savings.toFixed(2)}</span></p>
                </div>

                <div className="transfer-form">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                        placeholder="Amount to add"
                        className="w-full rounded-lg border border-gray-300 p-2 mb-4 text-gray-700"
                    />
                    <button
                        className="w-full rounded-lg bg-green-700 py-2 text-white font-semibold hover:bg-green-800 transition duration-200"
                        onClick={handleAddSavings}
                    >
                        Add to Savings
                    </button>
                </div>
            </div>
        </div>
    );
}