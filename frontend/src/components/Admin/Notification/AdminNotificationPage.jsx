import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBell, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import NewsletterModal from './NewsletterModal';
import NotificationModal from './NotificationModal';
import AnnouncementModal from './AnnouncementModal';

const AdminNotificationPage = () => {
    const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);

    return (
        <div className="container mx-auto px-6 lg:px-20 py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-10">Admin Dashboard</h1>

            {/* Card Grid for Components */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {/* Newsletter Section */}
                <Link
                    to="/admin/notifications/newsletter"
                    className="cursor-pointer bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center justify-between"
                >
                    <div className="text-left">
                        <h3 className="text-xl font-bold text-gray-700">Newsletter & Marketing</h3>
                        <p className="text-gray-600 mt-2">Manage email campaigns and newsletters</p>
                    </div>
                    <FontAwesomeIcon icon={faEnvelope} className="text-teal-600 text-4xl" />
                </Link>

                {/* Notifications Section */}
                <Link
                    to="/admin/notifications/notification"
                    className="cursor-pointer bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center justify-between"
                >
                    <div className="text-left">
                        <h3 className="text-xl font-bold text-gray-700">Notifications & Alerts</h3>
                        <p className="text-gray-600 mt-2">Manage system notifications and alerts</p>
                    </div>
                    <FontAwesomeIcon icon={faBell} className="text-teal-600 text-4xl" />
                </Link>

                {/* Announcements Section */}
                <Link
                    to="/admin/notifications/announcement"
                    className="cursor-pointer bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center justify-between"
                >
                    <div className="text-left">
                        <h3 className="text-xl font-bold text-gray-700">Announcements</h3>
                        <p className="text-gray-600 mt-2">Post and manage announcements</p>
                    </div>
                    <FontAwesomeIcon icon={faBullhorn} className="text-teal-600 text-4xl" />
                </Link>
            </div>

        </div>
    );
};

export default AdminNotificationPage;
