import { MongoClient } from 'mongodb';
import clientPromise from './mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

async function updateSavings(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { balance, savings } = req.body;

    try {
        const client = await clientPromise;
        const db = client.db('volt_bank');

        const result = await db.collection('users').updateOne(
            { _id: req.userId },
            { $set: { balance, savings } }
        );

        if (result.modifiedCount === 1) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(400).json({ success: false });
        }
    } catch (error) {
        console.error('Error updating savings:', error);
        return res.status(500).json({ success: false });
    }
}

import React, { useState, useEffect } from 'react';

const Transfer = () => {
    const [balance, setBalance] = useState(0);
    const [savings, setSavings] = useState(0);
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');

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
            setMessage('Amount exceeds balance');
            return;
        }

        const newBalance = balance - amount;
        const newSavings = savings + amount;

        fetch('/api/updateSavings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ balance: newBalance, savings: newSavings }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setBalance(newBalance);
                setSavings(newSavings);
                setMessage(`Successfully added $${amount.toFixed(2)} to savings.`);
            } else {
                setMessage('Error updating savings');
            }
        })
        .catch(error => {
            console.error('Error updating savings:', error);
            setMessage('Error updating savings');
        });
    };

    return (
        <div className="transfer-container">
            <h2>Transfer to Savings</h2>
            <div className="balance-info">
                <p>Balance: ${balance.toFixed(2)}</p>
                <p>Savings: ${savings.toFixed(2)}</p>
            </div>
            <div className="transfer-form">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    placeholder="Amount to add"
                />
                <button
                    className="w-full rounded-lg bg-green-700 py-2 text-white font-semibold hover:bg-green-800 transition duration-200"
                    onClick={handleAddSavings}
                >
                    Add to Savings
                </button>
                {message && <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>}
            </div>
        </div>
    );
};

export default Transfer;