// /solana-crowdfunding-platform/frontend/src/components/Review/ReviewForm.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitReview } from '../../redux/actions/reviewActions';

const ReviewForm = ({ projectId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(submitReview(projectId, rating, comment));
    setRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} class="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-teal-600 mb-4">Submit a Review</h2>
      <div class="mb-4">
        <label htmlFor="rating" class="block text-gray-700 font-semibold mb-2">Rating:</label>
        <input
          type="number"
          id="rating"
          min="0"
          max="5"
          value={rating}
          onChange={handleRatingChange}
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div class="mb-4">
        <label htmlFor="comment" class="block text-gray-700 font-semibold mb-2">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={handleCommentChange}
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full bg-teal-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-700 transition duration-300"
      >
        Submit Review
      </button>
    </form>

  );
};

export default ReviewForm;