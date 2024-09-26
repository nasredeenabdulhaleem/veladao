import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faProjectDiagram, faUserAlt, faBullhorn, faHandHoldingUsd, faChartLine, faBell, faFileAlt, faFlagCheckered, faCogs } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const DashboardSidebar = ({ isOpen, toggleSidebar }) => {
    // const { userProject } = useSelector(state => state.project);
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 bg-teal-700 text-white w-64 z-50  transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="flex justify-between items-center px-6 py-4">
                    <h2 className="text-2xl font-bold">Menu</h2>
                </div>

                {/* Navigation Links */}
                <nav className="mt-4">
                    <Link to="/admin" className="block px-6 py-4 hover:bg-teal-600">
                        <FontAwesomeIcon icon={faHome} className="mr-2" />
                        Dashboard
                    </Link>
                    <Link to="/admin/projects" className="block px-6 py-4 hover:bg-teal-600">
                        <FontAwesomeIcon icon={faProjectDiagram} className="mr-2" />
                        Projects
                    </Link>
                    <Link to="/admin/users" className="block px-6 py-4 hover:bg-teal-600">
                        <FontAwesomeIcon icon={faUserAlt} className="mr-2" />
                        Users
                    </Link>
                    <Link to="/admin/campaign" className="block px-6 py-4 hover:bg-teal-600">
                        <FontAwesomeIcon icon={faBullhorn} className="mr-2" />
                        Campaign
                    </Link>
                    <Link to="/admin/contribution" className="block px-6 py-4 hover:bg-teal-600">
                        <FontAwesomeIcon icon={faHandHoldingUsd} className="mr-2" />
                        Contributions
                    </Link>
                    <Link to="/admin/milestone" className="block px-6 py-4 hover:bg-teal-600">
                        <FontAwesomeIcon icon={faFlagCheckered} className="mr-2" />
                        Milestones
                    </Link>
                    <Link to="/admin/report" className="block px-6 py-4 hover:bg-teal-600">
                        <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                        Reports & Analytics
                    </Link>
                    <Link to="/admin/cms" className="block px-6 py-4 hover:bg-teal-600">
                        <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                        CMS
                    </Link>
                    <Link to="/admin/notifications" className="block px-6 py-4 hover:bg-teal-600">
                        <FontAwesomeIcon icon={faBell} className="mr-2" />
                        Notifications
                    </Link>

                    <Link to="/admin/settings" className="block px-6 py-4 hover:bg-teal-600">
                        <FontAwesomeIcon icon={faCogs} className="mr-2" />
                        Settings
                    </Link>
                </nav>
            </div>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed left-64 inset-0 bg-black opacity-50 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
};

export default DashboardSidebar;
