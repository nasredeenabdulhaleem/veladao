
import { PROFILE_CREATE, PROFILE_UPDATE, PROFILE_FAIL, PROFILE_SUCCESS } from '../constants/profileConstants';
import { createUserProfile, getUserProfile, updateUserProfile } from '../../utils/api';

export const getProfile = (userId) => async (dispatch) => {
    try {
        const response = await getUserProfile(userId);
        dispatch({ type: PROFILE_SUCCESS, payload: response });
    } catch (error) {
        dispatch({ type: PROFILE_FAIL, payload: error.message });
    }
};

export const createProfile = (profileData) => async (dispatch) => {
    try {
        const response = await createUserProfile(profileData);
        dispatch({ type: PROFILE_CREATE, payload: response.data });
    } catch (error) {
        dispatch({ type: PROFILE_FAIL, payload: error.message });
    }
};

export const updateProfile = (profileData) => async (dispatch) => {
    try {
        const response = await updateUserProfile(profileData);
        dispatch({ type: PROFILE_UPDATE, payload: response.userProfile });
    } catch (error) {
        dispatch({ type: PROFILE_FAIL, payload: error.message });
    }
};
