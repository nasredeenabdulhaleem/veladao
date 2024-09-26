import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import AnnouncementModal from './AnnouncementModal';

const AnnouncementPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editAnnouncement, setEditAnnouncement] = useState(null);

    const announcements = [
        { id: 1, title: "Platform Maintenance", message: "The platform will undergo maintenance at 12 AM." },
        { id: 2, title: "New Features", message: "We have introduced new features!" },
    ];

    const handleEdit = (announcement) => {
        setEditAnnouncement(announcement);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setEditAnnouncement(null);
        setIsModalOpen(true);
    };

    return (
        <div className="container mx-auto px-6 lg:px-20 py-10">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800">Announcements</h1>
                <button
                    onClick={handleCreate}
                    className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-teal-700"
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Create New
                </button>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-left text-gray-700 font-semibold">
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {announcements.map((announcement) => (
                            <tr key={announcement.id}>
                                <td className="border px-4 py-2">{announcement.title}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleEdit(announcement)}
                                        className="text-yellow-500 hover:text-yellow-700 mr-4"
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <AnnouncementModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    editAnnouncement={editAnnouncement}
                />
            )}
        </div>
    );
};

export default AnnouncementPage;
