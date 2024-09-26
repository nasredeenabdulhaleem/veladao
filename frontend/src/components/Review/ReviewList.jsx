// /solana-crowdfunding-platform/frontend/src/components/Review/ReviewList.js

import React from 'react';
import { useSelector } from 'react-redux';

const ReviewList = () => {
  const reviews = useSelector(state => state.review.reviews);

  return (
    <div class="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-teal-600 mb-4">Reviews</h2>
      {reviews.length === 0 ? (
        <p class="text-gray-600">No reviews available.</p>
      ) : (
        <ul class="divide-y divide-gray-200">
          {reviews.map(review => (
            <li key={review.id} class="py-4">
              <p class="text-gray-800">{review.content}</p>
              <p class="text-gray-600 font-semibold">Rating: {review.rating}</p>
            </li>
          ))}
        </ul>
      )}
    </div>

  );
};

export default ReviewList;