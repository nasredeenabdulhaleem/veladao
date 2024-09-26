import React, { useState } from 'react';

const SearchBar = ({ projects }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    // Handle input change and filter results
    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchTerm(query);

        if (query.length > 0) {
            const results = projects.filter((project) =>
                project.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredResults(results);
            setShowDropdown(true);
        } else {
            setFilteredResults([]);
            setShowDropdown(false);
        }
    };

    return (
        <div className="relative">
            {/* Search Input */}
            <input
                type="text"
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-teal-500"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={handleInputChange}
            />

            {/* Search Results Dropdown */}
            {showDropdown && (
                <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg z-10">
                    {filteredResults.length > 0 ? (
                        filteredResults.map((project) => (
                            <a
                                key={project.id}
                                href={`/project/${project.id}`}
                                className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                            >
                                {project.title}
                            </a>
                        ))
                    ) : (
                        <p className="px-4 py-2 text-gray-500">No results found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
