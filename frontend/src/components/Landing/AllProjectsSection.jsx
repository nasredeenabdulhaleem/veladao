import React, { useState } from 'react';

// Sample data for demonstration purposes
const projects = [
  {
    id: 6,
    title: "Project Alpha",
    description: "Description for Project Alpha",
    fundingGoal: 10000,
    currentFunding: 5000,
    status: "active",
    endDate: "2024-09-30T12:51:05.000Z",
    imageUrl: "https://via.placeholder.com/300",
    tags: ["Technology", "Health"],
  },
  {
    id: 7,
    title: "Project Beta",
    description: "Description for Project Beta",
    fundingGoal: 20000,
    currentFunding: 15000,
    status: "active",
    endDate: "2024-10-30T12:51:05.000Z",
    imageUrl: "https://via.placeholder.com/300",
    tags: ["Education", "Community"],
  },
  // More projects...
];

const AllProjectsSection = () => {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(4);

  // Filtering function (for demonstration, currently just returns all projects)
  const filterProjects = (filterType) => {
    let sortedProjects;
    switch (filterType) {
      case "mostFunded":
        sortedProjects = [...projects].sort(
          (a, b) => b.currentFunding - a.currentFunding
        );
        break;
      case "newest":
        sortedProjects = [...projects].sort(
          (a, b) => new Date(b.endDate) - new Date(a.endDate)
        );
        break;
      case "endingSoon":
        sortedProjects = [...projects].sort(
          (a, b) => new Date(a.endDate) - new Date(b.endDate)
        );
        break;
      default:
        sortedProjects = projects;
    }
    setFilteredProjects(sortedProjects);
  };

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          All Projects Needing Funds
        </h2>

        {/* Filter Options */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => filterProjects("mostFunded")}
            className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition"
          >
            Most Funded
          </button>
          <button
            onClick={() => filterProjects("newest")}
            className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition"
          >
            Newest
          </button>
          <button
            onClick={() => filterProjects("endingSoon")}
            className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition"
          >
            Ending Soon
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProjects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              {/* Project Image */}
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-40 object-cover rounded-t-lg mb-4"
              />

              {/* Project Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {project.title}
              </h3>

              {/* Brief Description */}
              <p className="text-gray-600 mb-4">{project.description}</p>

              {/* Progress Bar */}
              <div className="relative pt-1 mb-4">
                <div className="overflow-hidden h-4 mb-1 text-xs flex rounded bg-teal-200">
                  <div
                    style={{
                      width: `${(project.currentFunding / project.fundingGoal) * 100}%`,
                    }}
                    className="flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                  ></div>
                </div>
                <span className="text-sm text-gray-500">
                  {`${Math.round(
                    (project.currentFunding / project.fundingGoal) * 100
                  )}% funded`}
                </span>
              </div>

              {/* Funding Details */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">
                  Raised: <span className="font-semibold">${project.currentFunding}</span>
                </span>
                <span className="text-sm text-gray-500">
                  Goal: <span className="font-semibold">${project.fundingGoal}</span>
                </span>
                <span className="text-sm text-gray-500">
                  Days Left:{" "}
                  <span className="font-semibold">
                    {Math.ceil(
                      (new Date(project.endDate) - new Date()) / (1000 * 60 * 60 * 24)
                    )}
                  </span>
                </span>
              </div>

              {/* Tags */}
              <div className="mb-4">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-teal-100 text-teal-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* View Project Button */}
              <a
                href={`/project/${project.id}`}
                className="block bg-teal-600 text-white text-center py-2 rounded-lg hover:bg-teal-700 transition duration-200"
              >
                View Project
              </a>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <ul className="flex space-x-2">
            {[...Array(Math.ceil(filteredProjects.length / projectsPerPage)).keys()].map((number) => (
              <li key={number + 1}>
                <button
                  onClick={() => paginate(number + 1)}
                  className={`px-4 py-2 rounded ${currentPage === number + 1
                      ? "bg-teal-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AllProjectsSection;
