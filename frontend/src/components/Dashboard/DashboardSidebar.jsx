// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faProjectDiagram, faTasks, faBars } from '@fortawesome/free-solid-svg-icons';

// const DashboardSidebar = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     return (
//         <div className="flex">
//             {/* Sidebar */}
//             <div className={`fixed inset-y-0 left-0 bg-teal-700 text-white w-64 md:w-72 lg:w-80 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
//                 <div className="flex justify-between items-center px-6 py-4">
//                     <h2 className="text-2xl font-bold">Menu</h2>
//                     <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl">
//                         <FontAwesomeIcon icon={faBars} />
//                     </button>
//                 </div>

//                 {/* Navigation Links */}
//                 <nav className="mt-4">
//                     <a to="/dashboard" className="block px-6 py-4 hover:bg-teal-600">
//                         <FontAwesomeIcon icon={faHome} className="mr-2" />
//                         Dashboard
//                     </a>
//                     <a to="/projects" className="block px-6 py-4 hover:bg-teal-600">
//                         <FontAwesomeIcon icon={faProjectDiagram} className="mr-2" />
//                         Projects
//                     </a>
//                     <a to="/tasks" className="block px-6 py-4 hover:bg-teal-600">
//                         <FontAwesomeIcon icon={faTasks} className="mr-2" />
//                         Tasks
//                     </a>
//                 </nav>
//             </div>

//             {/* Overlay for Mobile */}
//             {isOpen && (
//                 <div
//                     className="fixed inset-0 bg-black opacity-50 hidden"
//                     onClick={() => setIsOpen(false)}
//                 ></div>
//             )}

//             {/* Content */}
//             <div className="flex-1 md:ml-72 lg:ml-80 p-6">
//                 <nav className="mt-4">
//                     <a to="/dashboard" className="block px-6 py-4 hover:bg-teal-600">
//                         <FontAwesomeIcon icon={faHome} className="mr-2" />
//                         Dashboard
//                     </a>
//                     <a to="/projects" className="block px-6 py-4 hover:bg-teal-600">
//                         <FontAwesomeIcon icon={faProjectDiagram} className="mr-2" />
//                         Projects
//                     </a>
//                     <a to="/tasks" className="block px-6 py-4 hover:bg-teal-600">
//                         <FontAwesomeIcon icon={faTasks} className="mr-2" />
//                         Tasks
//                     </a>
//                 </nav>
//             </div>
//         </div>
//     );
// };

// export default DashboardSidebar;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faProjectDiagram, faTasks } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const DashboardSidebar = ({ isOpen, toggleSidebar }) => {
    // const { userProject } = useSelector(state => state.project);
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 bg-teal-700 text-white w-64  transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="flex justify-between items-center px-6 py-4">
                    <h2 className="text-2xl font-bold">Menu</h2>
                </div>

                {/* Navigation Links */}
                <nav className="mt-4">
                    <Link to="/dashboard" className="block px-6 py-4 hover:bg-teal-600">
                        <FontAwesomeIcon icon={faHome} className="mr-2" />
                        Dashboard
                    </Link>
                    <Link to="/dashboard/projects" className="block px-6 py-4 hover:bg-teal-600">
                        <FontAwesomeIcon icon={faProjectDiagram} className="mr-2" />
                        Projects
                    </Link>
                    <Link to="/dashboard/tasks" className="block px-6 py-4 hover:bg-teal-600">
                        <FontAwesomeIcon icon={faTasks} className="mr-2" />
                        Tasks
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
