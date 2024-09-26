import {
    FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
    FETCH_USER_PROFILE_REQUEST, FETCH_USER_PROFILE_SUCCESS, FETCH_USER_PROFILE_FAILURE,
    CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
    BLOCK_USER_REQUEST, BLOCK_USER_SUCCESS, BLOCK_USER_FAILURE,
    ASSIGN_ROLE_REQUEST, ASSIGN_ROLE_SUCCESS, ASSIGN_ROLE_FAILURE
} from '../constants/userConstants';

// Initial state for user management
const initialState = {
    users: [],
    profile: null,
    loading: false,
    error: null,
};

// Fetch all users
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload };
        case FETCH_USERS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_USER_PROFILE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_USER_PROFILE_SUCCESS:
            return { ...state, loading: false, profile: action.payload };
        case FETCH_USER_PROFILE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case CREATE_USER_REQUEST:
            return { ...state, loading: true, error: null };
        case CREATE_USER_SUCCESS:
            return { ...state, loading: false, users: [...state.users, action.payload] };
        case CREATE_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case UPDATE_USER_REQUEST:
            return { ...state, loading: true, error: null };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.map(user =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };
        case UPDATE_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case BLOCK_USER_REQUEST:
            return { ...state, loading: true, error: null };
        case BLOCK_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.map(user =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };
        case BLOCK_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case ASSIGN_ROLE_REQUEST:
            return { ...state, loading: true, error: null };
        case ASSIGN_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.map(user =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };
        case ASSIGN_ROLE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default userReducer;