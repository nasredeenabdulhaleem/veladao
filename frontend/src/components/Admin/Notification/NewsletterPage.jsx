import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import NewsletterModal from './NewsletterModal';

const NewsletterPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editNewsletter, setEditNewsletter] = useState(null);

    const newsletters = [
        { id: 1, subject: "Monthly Update", body: "Here are the updates for this month." },
        { id: 2, subject: "New Projects", body: "Check out the new projects!" },
    ];

    const handleEdit = (newsletter) => {
        setEditNewsletter(newsletter);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setEditNewsletter(null);
        setIsModalOpen(true);
    };

    return (
        <div className="container mx-auto px-6 lg:px-20 py-10">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800">Newsletters</h1>
                <button
                    onClick={handleCreate}
                    className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-teal-700"
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Create New
                </button>
            </div>

            {/* Newsletter List */}
            <div className="bg-white shadow rounded-lg p-6">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-left text-gray-700 font-semibold">
                            <th className="px-4 py-2">Subject</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newsletters.map((newsletter) => (
                            <tr key={newsletter.id}>
                                <td className="border px-4 py-2">{newsletter.subject}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleEdit(newsletter)}
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
                <NewsletterModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    editNewsletter={editNewsletter}
                />
            )}
        </div>
    );
};

export default NewsletterPage;
