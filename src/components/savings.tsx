import React, { useState } from 'react';

interface PopUpTransferProps {
    balance: number;
    savings: number;
    onTransfer: (amount: number) => void;
}

const PopUpTransfer: React.FC<PopUpTransferProps> = ({ balance, savings, onTransfer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [transferAmount, setTransferAmount] = useState('');
    const [error, setError] = useState('');

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        setIsOpen(false);
        setTransferAmount('');
        setError('');
    };

    const handleTransfer = () => {
        const amount = parseFloat(transferAmount);

        if (isNaN(amount) || amount <= 0) {
            setError('Please enter a valid amount');
            return;
        }
        if (amount > balance) {
            setError('Insufficient balance');
            return;
        }

        onTransfer(amount);
        handleClose();
    };

    return (
        <div>
            <button onClick={handleOpen} className="px-4 py-2 bg-blue-600 text-white rounded">
                Transfer to Savings
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-semibold mb-4">Transfer to Savings</h2>

                        <label className="block text-gray-700">Amount to transfer:</label>
                        <input
                            type="number"
                            value={transferAmount}
                            onChange={(e) => setTransferAmount(e.target.value)}
                            className="w-full p-2 mt-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter amount"
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                        <div className="flex justify-end mt-4">
                            <button onClick={handleClose} className="px-4 py-2 bg-gray-300 rounded mr-2">
                                Cancel
                            </button>
                            <button onClick={handleTransfer} className="px-4 py-2 bg-blue-600 text-white rounded">
                                Transfer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PopUpTransfer;