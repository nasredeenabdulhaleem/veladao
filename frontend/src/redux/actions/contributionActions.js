// /solana-crowdfunding-platform/frontend/src/redux/actions/contributionActions.js

import { contributeToProject, getAllContributions, getContributions } from '../../utils/api';

// Action Types
export const FETCH_CONTRIBUTIONS_REQUEST = 'FETCH_CONTRIBUTIONS_REQUEST';
export const FETCH_ALL_CONTRIBUTIONS_SUCCESS = 'FETCH_ALL_CONTRIBUTIONS_SUCCESS';
export const FETCH_ALL_CONTRIBUTIONS_FAILURE = 'FETCH_ALL_CONTRIBUTIONS_FAILURE';
export const FETCH_CONTRIBUTIONS_SUCCESS = 'FETCH_CONTRIBUTIONS_SUCCESS';
export const FETCH_CONTRIBUTIONS_FAILURE = 'FETCH_CONTRIBUTIONS_FAILURE';
export const ADD_CONTRIBUTION_REQUEST = 'ADD_CONTRIBUTION_REQUEST';
export const ADD_CONTRIBUTION_SUCCESS = 'ADD_CONTRIBUTION_SUCCESS';
export const ADD_CONTRIBUTION_FAILURE = 'ADD_CONTRIBUTION_FAILURE';


// Action Creators

export const fetchAllContributions = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CONTRIBUTIONS_REQUEST });

    try {
      const response = await getAllContributions();
      dispatch({ type: FETCH_ALL_CONTRIBUTIONS_SUCCESS, payload: response.contributions });
    } catch (error) {
      dispatch({ type: FETCH_ALL_CONTRIBUTIONS_FAILURE, payload: error.message });
    }
  };
};
export const fetchContributions = (projectId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CONTRIBUTIONS_REQUEST });

    try {
      const response = await getContributions(projectId);
      dispatch({ type: FETCH_CONTRIBUTIONS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_CONTRIBUTIONS_FAILURE, payload: error.message });
    }
  };
};

export const addContribution = (contribution) => {
  return async (dispatch) => {
    dispatch({ type: ADD_CONTRIBUTION_REQUEST });

    try {
      const response = await contributeToProject(contribution);
      dispatch({ type: ADD_CONTRIBUTION_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ADD_CONTRIBUTION_FAILURE, payload: error.message });
    }
  };
};
