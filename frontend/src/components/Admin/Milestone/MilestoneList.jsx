import React from 'react';

const MilestoneList = ({ milestones, onApprove, onRequestMoreInfo, onhandleRelease }) => {
    return (
        <div className="container mx-auto px-6 lg:px-20 py-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Project Milestones</h2>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-left text-sm uppercase font-semibold">
                            <th className="px-4 py-3">Milestone</th>
                            <th className="px-4 py-3">Due Date</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {milestones.map((milestone) => (
                            <tr key={milestone.id}>
                                <td className="px-4 py-3">{milestone.description}</td>
                                <td className="px-4 py-3">{new Date(milestone.dueDate).toLocaleDateString()}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${milestone.status === 'approved'
                                            ? 'bg-green-200 text-green-700'
                                            : milestone.status === 'pending'
                                                ? 'bg-yellow-200 text-yellow-700'
                                                : 'bg-red-200 text-red-700'
                                            }`}
                                    >
                                        {milestone.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    {milestone.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => onhandleRelease(milestone.id)}
                                                className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 transition duration-200"
                                            >
                                                Handle Release
                                            </button>
                                            <button
                                                onClick={() => onApprove(milestone.id)}
                                                className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition duration-200 mr-2"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => onRequestMoreInfo(milestone.id)}
                                                className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition duration-200"
                                            >
                                                Request More Info
                                            </button>

                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MilestoneList;
