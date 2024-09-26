import { jwtDecode } from 'jwt-decode';
const token = localStorage.getItem('token');
let initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

if (token) {
  try {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
    } else {
      initialState = {
        user: decodedToken,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    }
  }
  catch (error) {
    console.error('Failed to decode token', error);
    localStorage.removeItem('token');
  }
}


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;