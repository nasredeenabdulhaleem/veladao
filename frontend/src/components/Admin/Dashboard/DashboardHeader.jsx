// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserCircle, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';

// const DashboardHeader = () => {
//     const [profileDropdown, setProfileDropdown] = useState(false);

//     return (
//         <header className="bg-teal-600 text-white shadow-md py-4 px-6">
//             <div className="container mx-auto flex justify-between items-center">
//                 {/* Logo */}
//                 <div className="text-2xl font-bold">
//                     <a href="/dashboard" className="hover:text-teal-100">MyDashboard</a>
//                 </div>

//                 {/* Navigation */}
//                 <nav className="hidden md:flex space-x-6">
//                     <a href="/dashboard" className="hover:text-teal-100">Dashboard</a>
//                     <a href="/settings" className="hover:text-teal-100">Settings</a>
//                 </nav>

//                 {/* User Profile Dropdown */}
//                 <div className="relative">
//                     <button
//                         onClick={() => setProfileDropdown(!profileDropdown)}
//                         className="focus:outline-none"
//                     >
//                         <FontAwesomeIcon icon={faUserCircle} className="text-3xl" />
//                     </button>

//                     {/* Dropdown */}
//                     {profileDropdown && (
//                         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 text-gray-700">
//                             <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
//                                 <FontAwesomeIcon icon={faCog} className="mr-2" />
//                                 Profile
//                             </a>
//                             <a href="/logout" className="block px-4 py-2 hover:bg-gray-100">
//                                 <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
//                                 Logout
//                             </a>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default DashboardHeader;

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faBars, faUserCircle, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';

const DashboardHeader = ({ toggleSidebar }) => {
    const [profileDropdown, setProfileDropdown] = useState(false);
    return (
        <header className="bg-teal-600 text-white shadow-md py-4 px-6 md:ml-64">
            <div className="container mx-auto flex justify-between items-center">
                {/* Sidebar Toggle Button */}
                <button onClick={toggleSidebar} className="text-2xl md:hidden focus:outline-none">
                    <FontAwesomeIcon icon={faBars} />
                </button>

                {/* Logo */}
                <div className="text-2xl font-bold">
                    <a href="/dashboard" className="hover:text-teal-100">VELADAO</a>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex space-x-6">
                    <a href="/dashboard" className="hover:text-teal-100">Dashboard</a>
                    <a href="/settings" className="hover:text-teal-100">Settings</a>
                </nav>

                {/* User Profile Dropdown */}
                <div className="relative">
                    <button className="focus:outline-none" onClick={() => setProfileDropdown(!profileDropdown)}>
                        <FontAwesomeIcon icon={faUserCircle} className="text-3xl" />
                    </button>
                    {/* Dropdown can be added here as needed */}
                    {profileDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 text-gray-700">
                            <Link to="/dashboard/profile" className="block px-4 py-2 hover:bg-gray-100">
                                <FontAwesomeIcon icon={faCog} className="mr-2" />
                                Profile
                            </Link>
                            <a href="/logout" className="block px-4 py-2 hover:bg-gray-100">
                                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                Logout
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
