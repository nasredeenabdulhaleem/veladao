import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Milestones = ({ milestones }) => {
    return (
        <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Milestones</h2>
            <div className="space-y-4">
                {milestones.length > 0 ? (
                    milestones.map((milestone, index) => (
                        <div
                            key={index}
                            className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
                        >
                            <div>
                                <p className="text-gray-700 font-semibold">{milestone.description}</p>
                                <p className="text-gray-500 text-sm">Due Date: {new Date(milestone.dueDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                {milestone.status === 'completed' && (
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xl" />
                                )}
                                {milestone.status === 'pending' && (
                                    <FontAwesomeIcon icon={faClock} className="text-yellow-500 text-xl" />
                                )}
                                {milestone.status === 'failed' && (
                                    <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-xl" />
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No milestones added for this project yet.</p>
                )}
            </div>
        </div>
    );
};

export default Milestones;
