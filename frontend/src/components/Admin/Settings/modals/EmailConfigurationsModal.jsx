import React, { useState } from 'react';

const EmailConfigurationsModal = ({ isOpen, onClose }) => {
    const [smtpServer, setSmtpServer] = useState('');
    const [smtpPort, setSmtpPort] = useState(587);
    const [smtpUsername, setSmtpUsername] = useState('');
    const [smtpPassword, setSmtpPassword] = useState('');

    const handleSaveEmailSettings = () => {
        // API call to save email settings
        console.log('Saving Email Settings:', { smtpServer, smtpPort, smtpUsername });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Email Configurations</h2>

                <label className="block text-gray-700 font-medium mb-2">SMTP Server</label>
                <input
                    type="text"
                    value={smtpServer}
                    onChange={(e) => setSmtpServer(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                    placeholder="smtp.example.com"
                />

                <div className="mt-4">
                    <label className="block text-gray-700 font-medium mb-2">SMTP Port</label>
                    <input
                        type="number"
                        value={smtpPort}
                        onChange={(e) => setSmtpPort(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                        placeholder="587"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-gray-700 font-medium mb-2">SMTP Username</label>
                    <input
                        type="text"
                        value={smtpUsername}
                        onChange={(e) => setSmtpUsername(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                        placeholder="your-email@example.com"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-gray-700 font-medium mb-2">SMTP Password</label>
                    <input
                        type="password"
                        value={smtpPassword}
                        onChange={(e) => setSmtpPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                    />
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100 transition duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveEmailSettings}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition duration-200"
                    >
                        Save Email Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailConfigurationsModal;
