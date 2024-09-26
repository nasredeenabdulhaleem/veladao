import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Helper function to create page numbers array
    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    // Disable buttons if necessary
    const isPrevDisabled = currentPage === 1;
    const isNextDisabled = currentPage === totalPages;

    return (
        <div className="flex justify-center items-center space-x-4 mt-8">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={isPrevDisabled}
                className={`px-4 py-2 rounded-lg shadow-md transition-all duration-300 ${isPrevDisabled
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                        : 'bg-teal-600 text-white hover:bg-teal-700'
                    }`}
            >
                Previous
            </button>

            {/* Page Numbers */}
            <ul className="flex space-x-2">
                {getPageNumbers().map((page) => (
                    <li key={page}>
                        <button
                            onClick={() => onPageChange(page)}
                            className={`px-4 py-2 rounded-lg shadow-md transition-all duration-300 ${page === currentPage
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={isNextDisabled}
                className={`px-4 py-2 rounded-lg shadow-md transition-all duration-300 ${isNextDisabled
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                        : 'bg-teal-600 text-white hover:bg-teal-700'
                    }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
