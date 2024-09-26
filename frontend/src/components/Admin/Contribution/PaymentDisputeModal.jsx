import React from 'react';

const PaymentDisputeModal = ({ dispute, onClose, onResolve }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Payment Dispute</h2>
                <div className="mb-4">
                    <p><strong>User:</strong> {dispute.userName}</p>
                    <p><strong>Project:</strong> {dispute.projectName}</p>
                    <p><strong>Amount:</strong> ${dispute.amount}</p>
                    <p><strong>Issue:</strong> {dispute.issue}</p>
                </div>
                <div className="flex justify-between">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700" onClick={onClose}>Close</button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700" onClick={() => onResolve('approve')}>Approve</button>
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700" onClick={() => onResolve('request-info')}>Request Info</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentDisputeModal;
