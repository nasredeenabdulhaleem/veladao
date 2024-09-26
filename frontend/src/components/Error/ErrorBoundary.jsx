import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'; // Error icon

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state to display fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error to an error tracking service here
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    // Retry Function to reset the error state
    handleRetry = () => {
        this.setState({ hasError: false });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
                    {/* Error Icon */}
                    <FontAwesomeIcon icon={faExclamationCircle} className="text-red-600 text-6xl mb-4" />

                    {/* Error Message */}
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Oops! Something went wrong.</h1>
                    <p className="text-lg text-gray-600 mb-6">We encountered an unexpected error. You can try again or go back to the homepage.</p>

                    {/* Retry Button */}
                    <button
                        onClick={this.handleRetry}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors mb-4"
                    >
                        Retry
                    </button>

                    {/* Back to Home Button */}
                    <Link
                        to="/"
                        className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            );
        }

        // Render children components if there's no error
        return this.props.children;
    }
}

export default ErrorBoundary;
