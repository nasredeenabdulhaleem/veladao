import React, { useState, useEffect } from 'react';

const AnnouncementModal = ({ isOpen, onClose, editAnnouncement }) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');

    useEffect(() => {
        if (editAnnouncement) {
            setTitle(editAnnouncement.title);
            setMessage(editAnnouncement.message);
            setScheduleDate(editAnnouncement.scheduleDate || '');
        }
    }, [editAnnouncement]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // API Call to create or update announcement
        onClose();
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/3">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {editAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Announcement Title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Message</label>
                        <textarea
                            rows="5"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your announcement"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Schedule Date</label>
                        <input
                            type="date"
                            value={scheduleDate}
                            onChange={(e) => setScheduleDate(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-lg">
                            Cancel
                        </button>
                        <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
                            {editAnnouncement ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AnnouncementModal;
