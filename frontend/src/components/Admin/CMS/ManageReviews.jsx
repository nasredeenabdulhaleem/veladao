import React, { useState } from 'react';

const ManageReviews = () => {
    const [reviews, setReviews] = useState([
        { id: 1, user: 'John Doe', content: 'Great platform!', status: 'pending' },
        { id: 2, user: 'Jane Doe', content: 'Had some issues.', status: 'flagged' },
    ]);

    const handleApprove = (id) => {
        // Approve review logic
        console.log('Approved review:', id);
    };

    const handleReject = (id) => {
        // Reject review logic
        console.log('Rejected review:', id);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Manage Reviews</h2>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id} className="mb-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{review.user}</h3>
                                <p className="text-gray-600">{review.content}</p>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => handleApprove(review.id)}
                                    className="bg-green-500 text-white px-3 py-1 rounded-lg"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleReject(review.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageReviews;
