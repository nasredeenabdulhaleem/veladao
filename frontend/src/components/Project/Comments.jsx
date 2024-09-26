import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Comments = ({ reviews }) => {
    return (
        <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">User Comments & Reviews</h2>
            <div className="space-y-4">
                {reviews && reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div
                            key={index}
                            className="p-4 bg-white rounded-lg shadow-md"
                        >
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-2" />
                                <p className="text-gray-700 font-semibold">{review.rating}/5</p>
                            </div>
                            <p className="text-gray-600 mt-2">{review.comment}</p>
                            <p className="text-gray-500 text-sm mt-2">- {review.user.username}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
                )}
            </div>
        </div>
    );
};

export default Comments;
