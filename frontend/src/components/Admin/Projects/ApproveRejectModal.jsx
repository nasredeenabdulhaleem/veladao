import React, { useState } from 'react';

const ApproveRejectModal = ({ project, closeModal }) => {
    const [status, setStatus] = useState('');

    const handleSubmit = () => {
        // Handle approve/reject logic here
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <button
                    onClick={closeModal}
                    className="text-gray-500 absolute top-2 right-3 text-2xl">&times;
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Approve or Reject Project</h2>
                <p className="text-gray-600 mb-4">{project.description}</p>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                    <option value="">Select Action</option>
                    <option value="approved">Approve</option>
                    <option value="rejected">Reject</option>
                </select>

                <button
                    onClick={handleSubmit}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-700 mt-4"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ApproveRejectModal;
