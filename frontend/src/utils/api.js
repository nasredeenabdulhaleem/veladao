import axios from 'axios';
import store from '../redux/store';
import { LOGOUT } from '../redux/constants/authConstants';

const BASE_URL = 'http://localhost:3000/api'; // Update with your backend API URL

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      store.dispatch({ type: LOGOUT });
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await api.post('/projects', projectData);
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error.response.data;
  }
};

export const getAllProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProjectById = async (projectId) => {
  try {
    const response = await api.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const getProjectsByOwnerId = async (ownerId) => {
  try {
    const response = await api.get(`/projects/owner/${ownerId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateProjectById = async (projectId, projectData) => {
  try {
    const response = await api.put(`/projects/${projectId}`, projectData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const contributeToProject = async (contributionData) => {
  try {
    const response = await api.post('/contributions', contributionData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getContributions = async (projectId) => {
  try {
    const response = await api.get(`/projects/${projectId}/contributions`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getAllContributions = async () => {
  try {
    const response = await api.get(`/contributions`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const submitReview = async (reviewData) => {
  try {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getReviews = async () => {
  try {
    const response = await api.get('/reviews');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/user-profile/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const createUserProfile = async (userProfile) => {
  try {
    const response = await api.post(`/user-profile/`, userProfile);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const updateUserProfile = async (userProfile) => {
  try {
    const response = await api.put(`/user-profile`, userProfile);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
// Admin Dashboard 
export const getAdminDashboardMetrics = async () => {
  try {
    const response = await api.get('/dashboard/metrics');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Users
export const getUsersApi = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const getUserProfileApi = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const createUserApi = async (userData) => {
  try {
    const response = await api.post('/dashboard/metrics', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const updateUserApi = async (userId, userData) => {
  try {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const updateUserStatusApi = async (userId, status) => {
  try {
    const response = await api.patch(`/users/${userId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const assignUserRoleApi = async (userId, role) => {
  try {
    const response = await api.patch(`/users/${userId}/role`, { role });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}


export default api;