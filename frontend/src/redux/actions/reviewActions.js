// /solana-crowdfunding-platform/frontend/src/redux/actions/reviewActions.js

// Action types
export const FETCH_REVIEWS_REQUEST = 'FETCH_REVIEWS_REQUEST';
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const FETCH_REVIEWS_FAILURE = 'FETCH_REVIEWS_FAILURE';
export const SUBMIT_REVIEW_REQUEST = 'SUBMIT_REVIEW_REQUEST';
export const SUBMIT_REVIEW_SUCCESS = 'SUBMIT_REVIEW_SUCCESS';
export const SUBMIT_REVIEW_FAILURE = 'SUBMIT_REVIEW_FAILURE';

// Action creators
export const fetchReviews = (projectId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_REVIEWS_REQUEST });

    try {
      // Make API request to fetch reviews for the specified project
      const response = await api.get(`/projects/${projectId}/reviews`);
      const reviews = response.data;

      dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: reviews });
    } catch (error) {
      dispatch({ type: FETCH_REVIEWS_FAILURE, payload: error.message });
    }
  };
};

export const submitReview = (projectId, review) => {
  return async (dispatch) => {
    dispatch({ type: SUBMIT_REVIEW_REQUEST });

    try {
      // Make API request to submit the review for the specified project
      await api.post(`/projects/${projectId}/reviews`, review);

      dispatch({ type: SUBMIT_REVIEW_SUCCESS });
    } catch (error) {
      dispatch({ type: SUBMIT_REVIEW_FAILURE, payload: error.message });
    }
  };
};
