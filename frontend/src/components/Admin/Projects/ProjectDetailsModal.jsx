import React from 'react';

const ProjectDetailsModal = ({ project, closeModal }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <button
                    onClick={closeModal}
                    className="text-gray-500 absolute top-2 right-3 text-2xl">&times;
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{project.title}</h2>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="mb-4">
                    <strong>Funding Goal: </strong>${project.fundingGoal}
                </div>
                <div className="mb-4">
                    <strong>Current Funding: </strong>${project.currentFunding}
                </div>
                <div className="mb-4">
                    <strong>Milestones: </strong>
                    <ul>
                        {project.milestones.map((milestone, index) => (
                            <li key={index}>
                                {milestone.description} - {milestone.status}
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    onClick={closeModal}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-700 mt-4"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ProjectDetailsModal;
