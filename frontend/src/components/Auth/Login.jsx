// /solana-crowdfunding-platform/frontend/src/components/Auth/Login.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/actions/authActions';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(login(email, password, navigate));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2" htmlFor="email">
              <i className="fas fa-envelope mr-2"></i>Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm mb-2" htmlFor="password">
              <i className="fas fa-lock mr-2"></i>Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zm10-1.647A7.962 7.962 0 0020 12h4c0 6.627-5.373 12-12 12v-4c3.042 0 5.824-1.135 7.938-3l-1.647-3zM12 4.291V8h3.709A7.952 7.952 0 0012 4.291zM8.291 19.709A7.952 7.952 0 0012 19.999V16H8.291z"
                  ></path>
                </svg>
                Loading...
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-teal-600 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?
          <Link to="/register" className="text-teal-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;