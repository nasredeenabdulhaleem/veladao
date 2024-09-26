// /solana-crowdfunding-platform/frontend/src/redux/reducers/projectReducer.js

const initialState = {
  projects: [],
  projectDetail: null,
  userProjects: [],
  loading: false,
  error: null,
  projectDetailError: null,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PROJECTS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_PROJECTS_SUCCESS':
      return {
        ...state,
        projects: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_PROJECTS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'FETCH_USER_PROJECTS_SUCCESS':
      return {
        ...state,
        userProjects: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_USER_PROJECTS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'CREATE_PROJECT_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'CREATE_PROJECT_SUCCESS':
      return {
        ...state,
        projects: [...state.projects, action.payload],
        loading: false,
        error: null,
      };
    case 'CREATE_PROJECT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'GET_PROJECT_DETAIL':
      return {
        ...state,
        projectDetail: action.payload,
        loading: false,
        error: null,
      };
    case 'GET_PROJECT_DETAIL_FAILURE':
      return {
        ...state,
        loading: false,
        projectDetailError: action.payload,
      };
    case 'UPDATE_PROJECT_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'UPDATE_PROJECT_SUCCESS':
      return {
        ...state,
        projectDetail: action.payload,
        loading: false,
        error: null,
      };
    case 'UPDATE_PROJECT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
};

export default projectReducer;