import React, { useState, useEffect } from 'react';

const NotificationModal = ({ isOpen, onClose, editNotification }) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');

    // Pre-fill the modal if editing a notification
    useEffect(() => {
        if (editNotification) {
            setTitle(editNotification.title);
            setMessage(editNotification.message);
            setScheduleDate(editNotification.scheduleDate || '');
        }
    }, [editNotification]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const notificationData = { title, message, scheduleDate };

        // Call the API to create or update the notification
        console.log('Notification Data:', notificationData);
        onClose(); // Close the modal
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/3 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Modal Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {editNotification ? 'Edit Notification' : 'Create New Notification'}
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Notification Title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Message</label>
                        <textarea
                            rows="4"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Notification Message"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    {/* Schedule Date */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Schedule Date</label>
                        <input
                            type="date"
                            value={scheduleDate}
                            onChange={(e) => setScheduleDate(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                            {editNotification ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NotificationModal;
