import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Icon */}
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-teal-600 text-6xl mb-4" />

            {/* 404 Code */}
            <h1 className="text-9xl font-bold text-teal-600">404</h1>

            {/* Subheading */}
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>

            {/* Description */}
            <p className="text-gray-600 text-center mb-6">
                Oops! The page you’re looking for doesn’t exist.
            </p>

            {/* Go Back to Home Button */}
            <Link
                to="/"
                className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-teal-700 transition-colors"
            >
                Go Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
