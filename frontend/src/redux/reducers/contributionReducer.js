// /solana-crowdfunding-platform/frontend/src/redux/reducers/contributionReducer.js

const initialState = {
  allContributions: [],
  contributions: [],
  loading: false,
  error: null,
};

const contributionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CONTRIBUTIONS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_ALL_CONTRIBUTIONS_SUCCESS':
      return {
        ...state,
        allContributions: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_ALL_CONTRIBUTIONS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'FETCH_CONTRIBUTIONS_SUCCESS':
      return {
        ...state,
        contributions: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_CONTRIBUTIONS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'ADD_CONTRIBUTION_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'ADD_CONTRIBUTION_SUCCESS':
      return {
        ...state,
        contributions: [...state.contributions, action.payload],
        loading: false,
        error: null,
      };
    case 'ADD_CONTRIBUTION_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default contributionReducer;