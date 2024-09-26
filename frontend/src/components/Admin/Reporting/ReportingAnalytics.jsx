import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faChartLine, faUser, faFileInvoiceDollar, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import ExportReportModal from './ExportReportModal';

const ReportingAnalytics = () => {
    const [isExportModalOpen, setExportModalOpen] = useState(false);

    return (
        <div className="container mx-auto px-6 lg:px-20 py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-10">Reporting & Analytics</h1>

            {/* Financial Reports Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold text-teal-600 mb-6">Financial Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <FontAwesomeIcon icon={faFileInvoiceDollar} className="text-teal-600 text-4xl" />
                        <div>
                            <h3 className="text-lg font-medium text-gray-700">Total Funds Raised</h3>
                            <p className="text-xl font-bold text-gray-900">$1,250,000</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <FontAwesomeIcon icon={faFileInvoiceDollar} className="text-teal-600 text-4xl" />
                        <div>
                            <h3 className="text-lg font-medium text-gray-700">Fees Earned</h3>
                            <p className="text-xl font-bold text-gray-900">$125,000</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <FontAwesomeIcon icon={faChartLine} className="text-teal-600 text-4xl" />
                        <div>
                            <h3 className="text-lg font-medium text-gray-700">Transaction Logs</h3>
                            <p className="text-xl font-bold text-gray-900">1,235 Transactions</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* User Reports Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold text-teal-600 mb-6">User Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <FontAwesomeIcon icon={faUser} className="text-teal-600 text-4xl" />
                        <div>
                            <h3 className="text-lg font-medium text-gray-700">New Signups</h3>
                            <p className="text-xl font-bold text-gray-900">350 Users</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <FontAwesomeIcon icon={faUser} className="text-teal-600 text-4xl" />
                        <div>
                            <h3 className="text-lg font-medium text-gray-700">Most Active Users</h3>
                            <p className="text-xl font-bold text-gray-900">25 Users</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <FontAwesomeIcon icon={faChartLine} className="text-teal-600 text-4xl" />
                        <div>
                            <h3 className="text-lg font-medium text-gray-700">User Growth</h3>
                            <p className="text-xl font-bold text-gray-900">12% This Month</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Reports Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold text-teal-600 mb-6">Project Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <FontAwesomeIcon icon={faProjectDiagram} className="text-teal-600 text-4xl" />
                        <div>
                            <h3 className="text-lg font-medium text-gray-700">Most Funded Projects</h3>
                            <p className="text-xl font-bold text-gray-900">Project Alpha</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <FontAwesomeIcon icon={faProjectDiagram} className="text-teal-600 text-4xl" />
                        <div>
                            <h3 className="text-lg font-medium text-gray-700">Total Projects</h3>
                            <p className="text-xl font-bold text-gray-900">85 Projects</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Export Button */}
            <div className="text-center">
                <button
                    onClick={() => setExportModalOpen(true)}
                    className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-700"
                >
                    <FontAwesomeIcon icon={faDownload} className="mr-2" />
                    Export Reports
                </button>
            </div>

            {/* Export Modal */}
            {isExportModalOpen && (
                <ExportReportModal isOpen={isExportModalOpen} onClose={() => setExportModalOpen(false)} />
            )}
        </div>
    );
};

export default ReportingAnalytics;
