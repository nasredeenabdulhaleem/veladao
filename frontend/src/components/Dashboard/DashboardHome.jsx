import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faTasks, faDollarSign, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
    return (
        <div className="container mx-auto p-6 lg:px-20">
            {/* Overview Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {/* Total Projects Card */}
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
                    <FontAwesomeIcon icon={faProjectDiagram} className="text-teal-600 text-4xl" />
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Total Projects</h3>
                        <p className="text-2xl font-semibold text-gray-600">12</p>
                    </div>
                </div>

                {/* Active Tasks Card */}
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
                    <FontAwesomeIcon icon={faTasks} className="text-teal-600 text-4xl" />
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Active Tasks</h3>
                        <p className="text-2xl font-semibold text-gray-600">8</p>
                    </div>
                </div>

                {/* Total Contributions Card */}
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
                    <FontAwesomeIcon icon={faDollarSign} className="text-teal-600 text-4xl" />
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Total Contributions</h3>
                        <p className="text-2xl font-semibold text-gray-600">$50,000</p>
                    </div>
                </div>

                {/* Quick Action Button */}
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-center">
                    <Link to="/dashboard/create" className="bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 focus:outline-none">
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        New Project
                    </Link>
                </div>
            </div>

            {/* Recent Projects Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-10">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Projects</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Project Card */}
                    <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                        <h3 className="text-lg font-semibold text-gray-800">Project Alpha</h3>
                        <p className="text-sm text-gray-600">Funding Goal: $10,000</p>
                        <p className="text-sm text-gray-600">Current Funding: $5,000</p>
                        <button className="text-teal-600 hover:underline mt-4">View Details</button>
                    </div>

                    {/* Project Card */}
                    <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                        <h3 className="text-lg font-semibold text-gray-800">Project Beta</h3>
                        <p className="text-sm text-gray-600">Funding Goal: $20,000</p>
                        <p className="text-sm text-gray-600">Current Funding: $15,000</p>
                        <button className="text-teal-600 hover:underline mt-4">View Details</button>
                    </div>

                    {/* Add more project cards as needed */}
                </div>
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-10">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h2>
                <ul className="space-y-4">
                    <li className="flex items-center">
                        <span className="text-teal-600 font-bold mr-2">[09/03/2024]</span>
                        <span className="text-gray-600">You created a new task: <span className="font-semibold">Design Dashboard</span></span>
                    </li>
                    <li className="flex items-center">
                        <span className="text-teal-600 font-bold mr-2">[09/01/2024]</span>
                        <span className="text-gray-600">You completed a milestone for <span className="font-semibold">Project Alpha</span></span>
                    </li>
                    {/* Add more activities as needed */}
                </ul>
            </div>
        </div>
    );
};

export default DashboardHome;
