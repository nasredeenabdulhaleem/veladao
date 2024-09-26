import React, { useState } from 'react';

const PlatformFeesModal = ({ isOpen, onClose }) => {
    const [platformFee, setPlatformFee] = useState(5);
    const [minContribution, setMinContribution] = useState(1);

    const handleSaveFees = () => {
        // API call to save fee settings
        console.log('Saving Platform Fees:', { platformFee, minContribution });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Platform Fees</h2>

                <label className="block text-gray-700 font-medium mb-2">Platform Fee (%)</label>
                <input
                    type="number"
                    value={platformFee}
                    onChange={(e) => setPlatformFee(e.target.value)}
                    placeholder="Enter platform fee"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500 mb-4"
                />

                <label className="block text-gray-700 font-medium mb-2">Minimum Contribution (USD)</label>
                <input
                    type="number"
                    value={minContribution}
                    onChange={(e) => setMinContribution(e.target.value)}
                    placeholder="Enter minimum contribution"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500 mb-4"
                />

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100 transition duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveFees}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition duration-200"
                    >
                        Save Fees
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlatformFeesModal;
