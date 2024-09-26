import React, { useState } from 'react';
import MaintenanceModeModal from './modals/MaintenanceModeModal';
import BlockchainSettingsModal from './modals/BlockchainSettingsModal';
import PlatformFeesModal from './modals/PlatformFeesModal';
import SecuritySettingsModal from './modals/SecuritySettingsModal';
import EmailConfigurationsModal from './modals/EmailConfigurationsModal';

const AppSettings = () => {
    const [isMaintenanceModalOpen, setMaintenanceModalOpen] = useState(false);
    const [isBlockchainModalOpen, setBlockchainModalOpen] = useState(false);
    const [isPlatformFeesModalOpen, setPlatformFeesModalOpen] = useState(false);
    const [isSecuritySettingsModalOpen, setSecuritySettingsModalOpen] = useState(false);
    const [isEmailConfigurationsModalOpen, setEmailConfigurationsModalOpen] = useState(false);

    return (
        <div className="container mx-auto px-6 lg:px-20 py-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">App Settings</h2>

            {/* Settings Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Maintenance Mode */}
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Maintenance Mode</h3>
                    <p className="text-gray-600 mb-4">Toggle between maintenance and live modes to control platform accessibility.</p>
                    <button
                        onClick={() => setMaintenanceModalOpen(true)}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition duration-200"
                    >
                        Configure
                    </button>
                </div>

                {/* Blockchain Settings */}
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Blockchain Settings</h3>
                    <p className="text-gray-600 mb-4">Manage Solana Blockchain network settings for fund transparency.</p>
                    <button
                        onClick={() => setBlockchainModalOpen(true)}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition duration-200"
                    >
                        Configure
                    </button>
                </div>

                {/* Platform Fees */}
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Platform Fees</h3>
                    <p className="text-gray-600 mb-4">Set the platform's fee structure and minimum contributions.</p>
                    <button
                        onClick={() => setPlatformFeesModalOpen(true)}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition duration-200"
                    >
                        Configure
                    </button>
                </div>

                {/* Security Settings */}
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Security Settings</h3>
                    <p className="text-gray-600 mb-4">Configure security policies like 2FA and password strength.</p>
                    <button
                        onClick={() => setSecuritySettingsModalOpen(true)}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition duration-200"
                    >
                        Configure
                    </button>
                </div>

                {/* Email Configurations */}
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Email Configurations</h3>
                    <p className="text-gray-600 mb-4">Configure the email settings for the platform's notifications.</p>
                    <button
                        onClick={() => setEmailConfigurationsModalOpen(true)}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition duration-200"
                    >
                        Configure
                    </button>
                </div>
            </div>

            {/* Modals */}
            <MaintenanceModeModal isOpen={isMaintenanceModalOpen} onClose={() => setMaintenanceModalOpen(false)} />
            <BlockchainSettingsModal isOpen={isBlockchainModalOpen} onClose={() => setBlockchainModalOpen(false)} />
            <PlatformFeesModal isOpen={isPlatformFeesModalOpen} onClose={() => setPlatformFeesModalOpen(false)} />
            <SecuritySettingsModal isOpen={isSecuritySettingsModalOpen} onClose={() => setSecuritySettingsModalOpen(false)} />
            <EmailConfigurationsModal isOpen={isEmailConfigurationsModalOpen} onClose={() => setEmailConfigurationsModalOpen(false)} />
        </div>
    );
};

export default AppSettings;
