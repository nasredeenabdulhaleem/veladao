import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProjectsByOwner } from '../../redux/actions/projectActions';
import { Link } from 'react-router-dom';

const Breadcrumb = () => {
    // Get the current route path
    const path = window.location.pathname;

    // Split the path into individual segments
    const segments = path.split('/').filter(segment => segment !== '');

    return (
        <nav className="text-sm font-medium bg-gray-100 py-4 px-6 rounded-lg shadow-md">
            <ol className="list-none p-0 flex items-center space-x-4">
                {/* Home Link */}
                <li className="flex items-center">
                    <Link to="/" className="text-teal-600 hover:text-teal-800">
                        Home
                    </Link>
                </li>

                {/* Dynamic Breadcrumb Segments */}
                {segments.map((segment, index) => (
                    <li className="flex items-center" key={index}>
                        {/* Chevron Icon */}
                        <svg
                            className="h-5 w-5 text-gray-400 mx-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>

                        {/* Breadcrumb Segment */}
                        <Link
                            to={`/${segments.slice(0, index + 1).join('/')}`}
                            className={`${index === segments.length - 1
                                ? 'text-gray-600'
                                : 'text-teal-600 hover:text-teal-800'
                                }`}
                        >
                            {segment.charAt(0).toUpperCase() + segment.slice(1)}
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

const DashboardLayout = () => {
    const { user, isAuthenticated } = useSelector(state => state.auth);
    // const { userProjects } = useSelector(state => state.project);
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.userId) {
            navigate('/login');
        }
        if (user.userId) {
            dispatch(getProjectsByOwner(user.userId));
        }
    }, [dispatch]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content Area */}
            <div className="flex-1">
                {/* Header */}
                <DashboardHeader toggleSidebar={toggleSidebar} />
                {/* Breadcrumb */}
                <div className="md:ml-64 p-6">
                    <Breadcrumb />
                </div>

                {/* Page Content (Injected by React Router Outlet) */}
                <main className="p-6 md:ml-64">

                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
