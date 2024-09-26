import React, { useState } from 'react';

const MilestoneApprovalModal = ({ isOpen, onClose, milestone, onApprove, onRequestMoreInfo }) => {
    const [comments, setComments] = useState('');

    const handleApprove = () => {
        onApprove(milestone.id, comments);
        onClose();
    };

    const handleRequestInfo = () => {
        onRequestMoreInfo(milestone.id, comments);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Milestone Approval</h2>

                <p className="text-gray-700 mb-4">Milestone: {milestone.description}</p>
                <p className="text-gray-700 mb-4">Due Date: {new Date(milestone.dueDate).toLocaleDateString()}</p>

                <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Add comments (optional)"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500 mb-4"
                ></textarea>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100 transition duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleRequestInfo}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                    >
                        Request Info
                    </button>
                    <button
                        onClick={handleApprove}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-200"
                    >
                        Approve
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MilestoneApprovalModal;
