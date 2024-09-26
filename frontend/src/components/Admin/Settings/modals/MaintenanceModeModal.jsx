import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { upsertSetting } from '../../../../redux/actions/settingsActions';
import { toast } from 'react-toastify';

const MaintenanceModeModal = ({ isOpen, onClose }) => {
    const { maintenance_mode } = useSelector((state) => state.settings.settings);
    const [isMaintenanceMode, setIsMaintenanceMode] = useState(() => maintenance_mode);
    const dispatch = useDispatch();

    const handleToggleMaintenanceMode = () => {
        // API call to toggle maintenance mode
        // setIsMaintenanceMode(!isMaintenanceMode);
        dispatch(upsertSetting({ key: "maintenance_mode", value: !isMaintenanceMode }))
        toast.success("Maintenance Mode Updated")

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Maintenance Mode</h2>
                <p className="text-gray-700 mb-4">Toggle the platform between Maintenance and Live modes.</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100 transition duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleToggleMaintenanceMode}
                        className={`px-4 py-2 rounded-lg shadow-md transition duration-200 ${isMaintenanceMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-teal-600 text-white hover:bg-teal-700'
                            }`}
                    >
                        {isMaintenanceMode ? 'Deactivate Maintenance Mode' : 'Activate Maintenance Mode'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MaintenanceModeModal;
