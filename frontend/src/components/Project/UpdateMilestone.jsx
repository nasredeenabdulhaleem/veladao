import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

const UpdateMilestone = ({ milestones, setMilestones }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMilestone, setCurrentMilestone] = useState(null);

    const handleDelete = (index) => {
        const newMilestones = milestones.filter((_, i) => i !== index);
        setMilestones(newMilestones);
    };

    const handleOpenModal = (milestone) => {
        setCurrentMilestone(milestone);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentMilestone(null);
    };

    const handleUpdateMilestone = (updatedMilestone) => {
        const newMilestones = milestones.map((milestone) =>
            milestone === currentMilestone ? updatedMilestone : milestone
        );
        setMilestones(newMilestones);
        handleCloseModal();
    };

    return (
        <div>
            <ul className='flex flex-col gap-4'>
                {milestones.map((milestone, index) => (
                    <li key={index} className=" px-4 py-2 rounded-lg shadow-sm border-solid border border-teal-900">
                        <div>{milestone.description}</div>
                        <div className="text-sm text-teal-600">Due: {new Date(milestone.dueDate).toLocaleDateString()}</div>
                        <div className="text-sm text-teal-600">Status: {milestone.status}</div>
                        <div className="flex justify-around">
                            <button className="text-red-500 hover:text-teal-700" onClick={() => handleDelete(index)}>
                                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                            </button>
                            <button className="text-green-500 hover:text-teal-700" type='button' onClick={() => handleOpenModal(milestone)}>
                                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {isModalOpen && (
                <UpdateModal
                    milestone={currentMilestone}
                    onClose={handleCloseModal}
                    onUpdate={handleUpdateMilestone}
                />
            )}
        </div>
    );
};

const UpdateModal = ({ milestone, onClose, onUpdate }) => {
    const [description, setDescription] = useState(milestone.description);
    const [dueDate, setDueDate] = useState(milestone.dueDate);
    const [status, setStatus] = useState(milestone.status);

    const handleSubmit = () => {
        onUpdate({ ...milestone, description, dueDate, status });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="modal bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-4">Update Milestone</h2>
                <label className="block mb-2">
                    Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </label>
                <label className="block mb-2">
                    Due Date:
                    <input
                        type="date"
                        value={new Date(dueDate).toISOString().split('T')[0]}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </label>
                <label className="block mb-4">
                    Status:
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </label>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                    >
                        Update
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateMilestone;