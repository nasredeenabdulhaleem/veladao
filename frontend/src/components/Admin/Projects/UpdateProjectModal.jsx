import React, { useState } from 'react';

const UpdateProjectModal = ({ project, closeModal, onUpdate, onDelete }) => {
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const [fundingGoal, setFundingGoal] = useState(project.fundingGoal);
    const [endDate, setEndDate] = useState(project.endDate.split('T')[0]); // Assuming ISO date format
    const [featured, setFeatured] = useState(project.featured);

    // Handle form submission to update the project
    const handleUpdate = () => {
        const updatedProject = {
            id: project.id,
            title,
            description,
            fundingGoal,
            endDate,
            featured,
        };
        onUpdate(updatedProject);
        closeModal();
    };

    // Handle project deletion
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            onDelete(project.id);
            closeModal();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                <button
                    onClick={closeModal}
                    className="text-gray-500 absolute top-2 right-3 text-2xl">&times;
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Project</h2>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Project Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                        rows="5"
                    ></textarea>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Funding Goal</label>
                    <input
                        type="number"
                        value={fundingGoal}
                        onChange={(e) => setFundingGoal(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Featured</label>
                    <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="form-checkbox text-teal-600 focus:ring-0 focus:border-teal-500"
                    />
                    <span className="ml-2 text-gray-600">Feature this project on the homepage</span>
                </div>

                {/* Update and Delete Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={handleUpdate}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none"
                    >
                        Update Project
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 focus:outline-none"
                    >
                        Delete Project
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProjectModal;
