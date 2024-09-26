import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ProjectDetailsModal from './ProjectDetailsModal';
import ApproveRejectModal from './ApproveRejectModal';
import UpdateProjectModal from './UpdateProjectModal';
import { getProjects } from '../../../redux/actions/projectActions';
import { useDispatch, useSelector } from 'react-redux';

const AdminProjectList = () => {
    const { projects } = useSelector((state) => state.project);
    const dispatch = useDispatch();
    const [selectedProject, setSelectedProject] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isApproveRejectModalOpen, setIsApproveRejectModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState('');

    useEffect(() => {
        dispatch(getProjects());
    }, [])


    useEffect(() => {
        setFilteredProjects(projects);
    }, [projects]);

    const openDetailsModal = (project) => {
        setSelectedProject(project);
        setIsDetailsModalOpen(true);
    };

    const openApproveRejectModal = (project) => {
        setSelectedProject(project);
        setIsApproveRejectModalOpen(true);
    };

    const openUpdateModal = (project) => {
        setSelectedProject(project);
        setIsUpdateModalOpen(true);
    };

    const handleFilterClick = () => {
        const criteria = filterCriteria.toLowerCase();
        const filtered = projects.filter(project =>
            project.title.toLowerCase().includes(criteria)
        );
        setFilteredProjects(filtered);
    };

    return (
        <div className="container mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Projects</h2>
            <div className="mb-4 flex justify-between">
                <input
                    type="text"
                    value={filterCriteria}
                    onChange={(e) => setFilterCriteria(e.target.value)}
                    placeholder="Search Projects..."
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3"
                />
                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-700"
                    onClick={handleFilterClick}
                >
                    Filter Projects
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                    <div key={project.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
                        <p className="text-gray-600 mt-2">{project.description}</p>
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={() => openDetailsModal(project)}
                                className="text-teal-600 hover:underline"
                            >
                                <FontAwesomeIcon icon={faEye} /> View Details
                            </button>
                            <div className="space-x-2">
                                <button
                                    onClick={() => openUpdateModal(project)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600"
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                    onClick={() => openApproveRejectModal(project)}
                                    className="bg-green-600 text-white px-2 py-1 rounded-lg hover:bg-green-700"
                                >
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                </button>
                                <button className="bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modals */}
            {selectedProject && isDetailsModalOpen && (
                <ProjectDetailsModal
                    project={selectedProject}
                    closeModal={() => setIsDetailsModalOpen(false)}
                />
            )}
            {selectedProject && isApproveRejectModalOpen && (
                <ApproveRejectModal
                    project={selectedProject}
                    closeModal={() => setIsApproveRejectModalOpen(false)}
                />
            )}
            {selectedProject && isUpdateModalOpen && (
                <UpdateProjectModal
                    project={selectedProject}
                    closeModal={() => setIsUpdateModalOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminProjectList;
