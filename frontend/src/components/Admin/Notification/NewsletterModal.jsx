import React, { useState, useEffect } from 'react';

const NewsletterModal = ({ isOpen, onClose, editNewsletter }) => {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        if (editNewsletter) {
            setSubject(editNewsletter.subject);
            setBody(editNewsletter.body);
        }
    }, [editNewsletter]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the API to save the newsletter (create/update)
        onClose();
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/3">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {editNewsletter ? 'Edit Newsletter' : 'Create New Newsletter'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Subject</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Newsletter Subject"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Email Body</label>
                        <textarea
                            rows="5"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Write your newsletter here..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-lg">
                            Cancel
                        </button>
                        <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
                            {editNewsletter ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewsletterModal;
