import { assignUserRoleApi, createUserApi, getUserProfileApi, getUsersApi, updateUserApi, updateUserStatusApi } from '../../utils/api';
import {
    FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
    FETCH_USER_PROFILE_REQUEST, FETCH_USER_PROFILE_SUCCESS, FETCH_USER_PROFILE_FAILURE,
    CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
    BLOCK_USER_REQUEST, BLOCK_USER_SUCCESS, BLOCK_USER_FAILURE,
    ASSIGN_ROLE_REQUEST, ASSIGN_ROLE_SUCCESS, ASSIGN_ROLE_FAILURE
} from '../constants/userConstants';
// Fetch all users
export const getUsers = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_USERS_REQUEST });
        const data = await getUsersApi();
        console.log(data)
        dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_USERS_FAILURE, payload: error.response.data.message });
    }
};

// Fetch user profile by ID
export const getUserProfile = (userId) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_USER_PROFILE_REQUEST });
        const data = await getUserProfileApi(userId);
        dispatch({ type: FETCH_USER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_USER_PROFILE_FAILURE, payload: error.response.data.message });
    }
};

// Create a new user
export const createUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_USER_REQUEST });
        const data = await createUserApi(userData);
        dispatch({ type: CREATE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_USER_FAILURE, payload: error.response.data.message });
    }
};

// Update user
export const updateUser = (userId, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });
        const data = await updateUserApi(userId, userData)
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_USER_FAILURE, payload: error.response.data.message });
    }
};

// Block or unblock a user
export const updateUserStatus = (userId, status) => async (dispatch) => {
    try {
        dispatch({ type: BLOCK_USER_REQUEST });
        const data = await updateUserStatusApi(userId, status);
        dispatch({ type: BLOCK_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: BLOCK_USER_FAILURE, payload: error.response.data.message });
    }
};

// Assign user role (admin, donor, etc.)
export const assignUserRole = (userId, role) => async (dispatch) => {
    try {
        dispatch({ type: ASSIGN_ROLE_REQUEST });
        const data = await assignUserRoleApi(userId, role);
        dispatch({ type: ASSIGN_ROLE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ASSIGN_ROLE_FAILURE, payload: error.response.data.message });
    }
};
