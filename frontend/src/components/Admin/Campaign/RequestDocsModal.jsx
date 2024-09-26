import React, { useState } from 'react';

const RequestDocsModal = ({ campaign, onRequestDocs, closeModal }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRequestDocs(campaign.id, message);
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                <button
                    onClick={closeModal}
                    className="text-gray-500 absolute top-2 right-3 text-2xl">&times;
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Request Additional Documents</h2>

                <form onSubmit={handleSubmit}>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message to request additional documents"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 mb-4"
                        rows="5"
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-700 focus:outline-none"
                    >
                        Send Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RequestDocsModal;
