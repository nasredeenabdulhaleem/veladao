import {
    FETCH_DASHBOARD_METRICS_REQUEST,
    FETCH_DASHBOARD_METRICS_SUCCESS,
    FETCH_DASHBOARD_METRICS_FAILURE
} from '../constants/dashboardConstants';

// Initial State
const initialState = {
    loading: false,
    totalUsers: 0,
    totalProjects: 0,
    totalAmountRaised: 0,
    totalDonations: 0,
    recentActivities: [],
    fundingTrends: [],
    error: '',
};

// Dashboard Reducer
const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DASHBOARD_METRICS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_DASHBOARD_METRICS_SUCCESS:
            return {
                ...state,
                loading: false,
                totalUsers: action.payload.totalUsers,
                totalProjects: action.payload.totalProjects,
                totalAmountRaised: action.payload.totalAmountRaised,
                totalDonations: action.payload.totalDonations,
                recentActivities: action.payload.recentActivities,
                fundingTrends: action.payload.fundingTrends,
                error: '',
            };
        case FETCH_DASHBOARD_METRICS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default dashboardReducer;
