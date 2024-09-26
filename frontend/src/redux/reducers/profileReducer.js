import {
    PROFILE_CREATE,
    PROFILE_UPDATE,
    PROFILE_SUCCESS,
    PROFILE_FAIL,
    PROFILE_REQUEST,
} from '../constants/profileConstants';

// Initial State for the profile reducer
const initialState = {
    profile: null, // Will hold the profile data
    loading: false, // Indicates if a request is being made
    error: null, // Will hold any error message
};

// Profile Reducer Function
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_REQUEST:
            return {
                ...state,
                loading: true, // Set loading state to true when a request is made
            };

        case PROFILE_SUCCESS:
            return {
                ...state,
                loading: false, // Reset loading to false when data is received
                profile: action.payload, // Store profile data in the state
                error: null, // Clear any previous errors
            };

        case PROFILE_CREATE:
        case PROFILE_UPDATE:
            return {
                ...state,
                loading: false, // Reset loading to false once profile is created/updated
                profile: action.payload, // Update the profile with the new data
                error: null, // Clear any previous errors
            };

        case PROFILE_FAIL:
            return {
                ...state,
                loading: false, // Reset loading to false when there is an error
                error: action.payload, // Store the error message
            };

        default:
            return state; // Return the default state if no matching action type
    }
};

export default profileReducer;