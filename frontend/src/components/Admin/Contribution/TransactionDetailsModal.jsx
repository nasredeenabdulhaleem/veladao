import React from 'react';

const TransactionDetailsModal = ({ transaction, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
                <div className="mb-4">
                    <p><strong>Transaction ID:</strong> {transaction.id}</p>
                    <p><strong>Project:</strong> {transaction.projectName}</p>
                    <p><strong>User:</strong> {transaction.userName}</p>
                    <p><strong>Amount:</strong> ${transaction.amount}</p>
                    <p><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {transaction.status}</p>
                </div>
                <div className="flex justify-between">
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    {transaction.status === 'successful' && (
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Refund
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionDetailsModal;
