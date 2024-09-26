import React, { useState } from 'react';

const SecuritySettingsModal = ({ isOpen, onClose }) => {
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [minPasswordLength, setMinPasswordLength] = useState(8);

    const handleSaveSecuritySettings = () => {
        // API call to save security settings
        console.log('Saving Security Settings:', { twoFactorAuth, minPasswordLength });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Security Settings</h2>

                <label className="block text-gray-700 font-medium mb-2">Enable Two-Factor Authentication (2FA)</label>
                <input
                    type="checkbox"
                    checked={twoFactorAuth}
                    onChange={(e) => setTwoFactorAuth(e.target.checked)}
                    className="form-checkbox text-teal-600 focus:ring-0 focus:border-teal-500"
                />
                <span className="ml-2 text-gray-600">Enable 2FA for better security</span>

                <div className="mt-6">
                    <label className="block text-gray-700 font-medium mb-2">Minimum Password Length</label>
                    <input
                        type="number"
                        value={minPasswordLength}
                        onChange={(e) => setMinPasswordLength(e.target.value)}
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
                        onClick={handleSaveSecuritySettings}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition duration-200"
                    >
                        Save Security Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettingsModal;
