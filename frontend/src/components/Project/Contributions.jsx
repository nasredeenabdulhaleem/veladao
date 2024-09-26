import React from 'react';

const Contributions = ({ contributions }) => {
    return (
        <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contributions</h2>
            <div className="space-y-4">
                {contributions.length > 0 ? (
                    contributions.map((contribution, index) => (
                        <div
                            key={index}
                            className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
                        >
                            <div>
                                <p className="text-gray-700 font-semibold">Amount: ${contribution.amount}</p>
                                <p className="text-gray-500 text-sm">Date: {new Date(contribution.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No contributions made to this project yet.</p>
                )}
            </div>
        </div>
    );
};

export default Contributions;
