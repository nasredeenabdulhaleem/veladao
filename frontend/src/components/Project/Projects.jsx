import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { faSearch, faPlus, faEdit, faEye, faFilter } from '@fortawesome/free-solid-svg-icons';

const Projects = () => {
    const { userProjects } = useSelector(state => state.project);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const itemsPerPage = 6; // Number of items per page

    // Function to handle search and filter
    const filteredUserProjects = userProjects.filter((project) => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || project.status === filter;
        return matchesSearch && matchesFilter;
    });

    // Calculate the paginated items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUserProjects.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredUserProjects.length / itemsPerPage);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // const handleEdit = (projectId) => () => {
    //     // Redirect to the project update page after clicking the Edit button and also add the project as a state to it
    // navigate(`/dashboard/update/${projectId}`)
    // };

    const handleEditProject = (project) => {
        navigate(`/dashboard/update/${project.id}`, { state: { project } });
    };

    return (
        <div className="container mx-auto p-6 lg:px-20">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
                <Link to="/dashboard/create" className="bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 focus:outline-none">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    New Project
                </Link>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
                {/* Search Bar */}
                <div className="flex items-center w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Search userProjects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none"
                    />
                    <button className="bg-teal-600 text-white p-3 rounded-r-lg">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>

                {/* Filter Dropdown */}
                <div className="relative">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="p-3 border z-0 border-gray-300 rounded-lg focus:outline-none"
                    >
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                    <FontAwesomeIcon icon={faFilter} className="absolute right-3 top-4 text-gray-500" />
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map((project) => (
                    <div key={project.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${project.status === 'completed'
                                    ? 'bg-green-100 text-green-600'
                                    : project.status === 'active'
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'bg-yellow-100 text-yellow-600'
                                    }`}
                            >
                                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-4">Funding Goal: ${project.fundingGoal}</p>
                        <p className="text-gray-600 mb-4">Current Funding: ${project.currentFunding}</p>
                        <div className="flex justify-between">
                            <Link to={`/dashboard/project/${project.id}`} className="text-teal-600 hover:underline">
                                <FontAwesomeIcon icon={faEye} className="mr-2" />
                                View
                            </Link >
                            <button onClick={() => handleEditProject(project)} className="text-yellow-600 hover:underline">
                                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10">
                <nav aria-label="Page navigation">
                    <ul className="inline-flex items-center">
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index}>
                                <button
                                    className={`px-4 py-2 mx-1 rounded-lg ${currentPage === index + 1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Projects;