import { getAdminDashboardMetrics } from "../../utils/api";
// Action Types
import {
    FETCH_DASHBOARD_METRICS_REQUEST,
    FETCH_DASHBOARD_METRICS_SUCCESS,
    FETCH_DASHBOARD_METRICS_FAILURE
} from '../constants/dashboardConstants';
// Action Creators
export const fetchDashboardMetricsRequest = () => ({
    type: FETCH_DASHBOARD_METRICS_REQUEST,
});

export const fetchDashboardMetricsSuccess = (metrics) => ({
    type: FETCH_DASHBOARD_METRICS_SUCCESS,
    payload: metrics,
});

export const fetchDashboardMetricsFailure = (error) => ({
    type: FETCH_DASHBOARD_METRICS_FAILURE,
    payload: error,
});

// Async Action using Redux Thunk to fetch dashboard metrics
export const getDashboardMetrics = () => {
    return async (dispatch) => {
        dispatch(fetchDashboardMetricsRequest());
        try {
            // Call the API to fetch dashboard metrics (replace with your actual API endpoint)
            const response = await getAdminDashboardMetrics();

            dispatch(fetchDashboardMetricsSuccess(response));
        } catch (error) {
            dispatch(fetchDashboardMetricsFailure(error.message));
        }
    };
};
