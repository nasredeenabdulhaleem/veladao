
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { getProjects } from '../../redux/actions/projectActions';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import Pagination from './Pagination'; // Assuming you have a pagination component

// const ProjectList = () => {
//   const { projects, totalProjects } = useSelector((state) => state.project);
//   const dispatch = useDispatch();
//   const [currentPage, setCurrentPage] = useState(1);
//   const projectsPerPage = 10; // Number of projects per page
//   const totalPages = Math.ceil(totalProjects / projectsPerPage);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     dispatch(getProjects(page, projectsPerPage));
//   };

//   useEffect(() => {
//     dispatch(getProjects(currentPage, projectsPerPage));
//   }, [dispatch, currentPage]);

//   return (
//     <div className="container mx-auto px-6 lg:px-20 py-10">
//       {/* Header and Search Bar */}
//       <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4 lg:mb-0">Discover Projects</h1>

//         {/* Search Bar */}
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search projects..."
//             className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
//           />
//           <FontAwesomeIcon icon={faSearch} className="absolute right-4 top-3 text-gray-500" />
//         </div>
//       </div>

//       {/* Filters (if needed) */}
//       <div className="mb-8 flex justify-between items-center">
//         <div className="flex space-x-4">
//           <button className="px-4 py-2 text-teal-600 bg-teal-50 hover:bg-teal-100 rounded-lg shadow-sm">
//             All Projects
//           </button>
//           <button className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm">
//             Most Funded
//           </button>
//           <button className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm">
//             Ending Soon
//           </button>
//         </div>
//       </div>

//       {/* Projects Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {projects.map((project) => (
//           <div key={project.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//             <img
//               src={project.imageUrl || 'https://via.placeholder.com/400x300'}
//               alt={project.title}
//               className="w-full h-48 object-cover rounded-lg mb-4"
//             />
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
//             <p className="text-gray-600 mb-4">{project.description}</p>

//             {/* Funding Progress */}
//             <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
//               <div
//                 className="bg-teal-600 h-4 rounded-full"
//                 style={{ width: `${(project.currentFunding / project.fundingGoal) * 100}%` }}
//               ></div>
//             </div>
//             <p className="text-sm text-gray-500">
//               ${project.currentFunding} raised of ${project.fundingGoal} goal
//             </p>

//             {/* Tags */}
//             <div className="flex space-x-2 mt-4">
//               {(() => {
//                 try {
//                   const tagsArray = JSON.parse(project.tags);
//                   if (Array.isArray(tagsArray)) {
//                     return tagsArray.map((tag, index) => (
//                       <span key={index} className="bg-teal-200 text-teal-800 px-2 py-1 rounded-full text-sm">
//                         {tag}
//                       </span>
//                     ));
//                   }
//                 } catch (e) {
//                   console.error('Failed to parse tags:', e);
//                 }
//                 return null;
//               })()}
//             </div>

//             {/* View Project Button */}
//             <Link
//               to={`/project/${project.id}`}
//               className="inline-block bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none mt-4"
//             >
//               View Project
//             </Link>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="mt-10">
//         <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
//       </div>
//     </div>
//   );
// };

// export default ProjectList;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from '../../redux/actions/projectActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Pagination from './Pagination'; // Assuming you have a pagination component

const ProjectList = () => {
  const { projects, totalProjects } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const projectsPerPage = 10;
  const totalPages = Math.ceil(totalProjects / projectsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(getProjects(page, projectsPerPage));
  };

  const filterProjects = (projects, filterType) => {
    switch (filterType) {
      case 'mostFunded':
        return [...projects].sort((a, b) => b.currentFunding - a.currentFunding);
      case 'endingSoon':
        return [...projects].sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
      case 'all':
      default:
        return projects;
    }
  };
  const handleFilterChange = (filterType) => {
    const filtered = filterProjects(projects, filterType);
    setFilteredProjects(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterBySearchQuery = (projects, query) => {
    if (!query) return projects;
    return projects.filter((project) =>
      project.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    dispatch(getProjects(currentPage, projectsPerPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  useEffect(() => {
    const filtered = filterBySearchQuery(projects, searchQuery);
    setFilteredProjects(filtered);
  }, [searchQuery, projects]);

  return (
    <div className="container mx-auto px-6 lg:px-20 py-10">
      {/* Header and Search Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 lg:mb-0">Discover Projects</h1>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects..."
            className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FontAwesomeIcon icon={faSearch} className="absolute right-4 top-3 text-gray-500" />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 text-teal-600 bg-teal-50 hover:bg-teal-100 rounded-lg shadow-sm"
            onClick={() => handleFilterChange('all')}
          >
            All Projects
          </button>
          <button
            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm"
            onClick={() => handleFilterChange('mostFunded')}
          >
            Most Funded
          </button>
          <button
            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm"
            onClick={() => handleFilterChange('endingSoon')}
          >
            Ending Soon
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <img
              src={project.imageUrl || 'https://via.placeholder.com/400x300'}
              alt={project.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>

            {/* Funding Progress */}
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="bg-teal-600 h-4 rounded-full"
                style={{ width: `${(project.currentFunding / project.fundingGoal) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              ${project.currentFunding} raised of ${project.fundingGoal} goal
            </p>

            {/* Tags */}
            <div className="flex space-x-2 mt-4">
              {(() => {
                try {
                  const tagsArray = JSON.parse(project.tags);
                  if (Array.isArray(tagsArray)) {
                    return tagsArray.map((tag, index) => (
                      <span key={index} className="bg-teal-200 text-teal-800 px-2 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ));
                  }
                } catch (e) {
                  console.error('Failed to parse tags:', e);
                }
                return null;
              })()}
            </div>

            {/* View Project Button */}
            <Link
              to={`/project/${project.id}`}
              className="inline-block bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none mt-4"
            >
              View Project
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ProjectList;