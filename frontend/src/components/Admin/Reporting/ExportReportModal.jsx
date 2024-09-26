import React from 'react';

const ExportReportModal = ({ isOpen, onClose }) => {
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/3">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Export Reports</h2>
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Select Report Type</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                        <option>Financial Report</option>
                        <option>User Report</option>
                        <option>Project Report</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Select Format</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                        <option>CSV</option>
                        <option>PDF</option>
                    </select>
                </div>
                <div className="flex justify-end space-x-4">
                    <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Cancel</button>
                    <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">Export</button>
                </div>
            </div>
        </div>
    );
};

export default ExportReportModal;
