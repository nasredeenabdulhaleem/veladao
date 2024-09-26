import React, { useState } from 'react';

const FundReleaseModal = ({ isOpen, onClose, project, onReleaseFunds }) => {
    const [amountToRelease, setAmountToRelease] = useState(0);

    const handleReleaseFunds = () => {
        if (amountToRelease > 0) {
            onReleaseFunds(project.id, amountToRelease);
            onClose();
        } else {
            alert("Please enter a valid amount.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Release Funds</h2>

                <p className="text-gray-700 mb-4">Project: {project.title}</p>
                <p className="text-gray-700 mb-4">Milestones Approved: {project.milestones.filter(m => m.status === 'approved').length}</p>

                <input
                    type="number"
                    value={amountToRelease}
                    onChange={(e) => setAmountToRelease(e.target.value)}
                    placeholder="Amount to release"
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
                        onClick={handleReleaseFunds}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-200"
                    >
                        Release Funds
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FundReleaseModal;
