import { GET_SETTING, UPSERT_SETTING, DELETE_SETTING, SETTINGS_ERROR } from '../actions/settingsActions';

const initialState = {
    settings: {}, // All the settings will be stored here by key
    error: null,  // To store any errors during settings operations
};

export default function settingsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SETTING:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    [action.payload.key]: action.payload.value,
                },
                error: null,
            };
        case UPSERT_SETTING:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    [action.payload.key]: action.payload.value,
                },
                error: null,
            };
        case DELETE_SETTING:
            const updatedSettings = { ...state.settings };
            delete updatedSettings[action.payload];
            return {
                ...state,
                settings: updatedSettings,
                error: null,
            };
        case SETTINGS_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}
