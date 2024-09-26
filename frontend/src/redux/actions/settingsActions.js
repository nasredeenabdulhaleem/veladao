import api from "../../utils/api";

// Constants for action types
export const GET_SETTING = 'GET_SETTING';
export const UPSERT_SETTING = 'UPSERT_SETTING';
export const DELETE_SETTING = 'DELETE_SETTING';
export const SETTINGS_ERROR = 'SETTINGS_ERROR';

// Action to get a setting by key
export const getSetting = (key) => async (dispatch) => {
    try {
        const response = await api.get(`/settings/get`, { params: { key } });
        console.log(response.data)
        dispatch({
            type: GET_SETTING,
            payload: response.data,
        });
    } catch (error) {
        console.error('Error fetching setting:', error);
        dispatch({
            type: SETTINGS_ERROR,
            payload: error.response.data,
        });
    }
};

// Action to upsert (create/update) a setting
export const upsertSetting = (settingData) => async (dispatch) => {
    try {
        const response = await api.post(`/settings/upsert`, settingData);
        dispatch({
            type: UPSERT_SETTING,
            payload: response.data,
        });
    } catch (error) {
        console.error('Error upserting setting:', error);
        dispatch({
            type: SETTINGS_ERROR,
            payload: error.response.data,
        });
    }
};

// Action to delete a setting by key
export const deleteSetting = (key) => async (dispatch) => {
    try {
        await api.delete(`/settings/delete`, { data: { key } });
        dispatch({
            type: DELETE_SETTING,
            payload: key,
        });
    } catch (error) {
        console.error('Error deleting setting:', error);
        dispatch({
            type: SETTINGS_ERROR,
            payload: error.response.data,
        });
    }
};