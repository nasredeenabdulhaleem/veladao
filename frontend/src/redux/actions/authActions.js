
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import { LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE, LOGOUT, SET_LOADING } from '../constants/authConstants';

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

// Action creator for user login
export const login = (email, password, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });

    const token = response.data.token;
    const decodedToken = jwtDecode(token);
    localStorage.setItem('token', token);
    toast.success('Login successful');
    dispatch({ type: LOGIN_SUCCESS, payload: decodedToken });
    if (decodedToken.role === "admin") {
      navigate('/admin');
      return;
    }
    navigate('/dashboard');
  } catch (error) {
    if (error.response && error.response.data.errors) {
      error.response.data.errors.forEach(err => toast.error(err.msg));
    } else {
      toast.error(`Invalid email or password${error.response.data.message}`);
    }
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });
  } finally {
    dispatch(setLoading(false));
  }
};

// Action creator for user registration
export const registerUser = (name, email, password, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post('http://localhost:3000/api/auth/register', { "username": name, email, password });
    toast.success('Registration successful');
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    navigate('/login');
  } catch (error) {
    if (error.response && error.response.data.errors) {
      error.response.data.errors.forEach(err => toast.error(err.msg));
    } else {
      toast.error(`Registration failed ${error.response.data.message}`);

    }
    dispatch({ type: REGISTER_FAILURE, payload: error.response.data.message });
  } finally {
    dispatch(setLoading(false));
  }
};

// Action creator for user logout
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};
