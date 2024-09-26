import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjectDetail } from '../../redux/actions/projectActions';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faShareAlt, faCopy } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Milestones from './Milestones';
import Contributions from './Contributions';
import Comments from './Comments';

const ProjectDetail = () => {
  const { projectDetail } = useSelector((state) => state.project);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectDetail(projectId));
  }, [dispatch, projectId]);

  const handleEditProject = (project) => {
    navigate(`/dashboard/update/${project.id}`, { state: { project } });
  };

  if (!projectDetail) {
    return (
      <div className="flex flex-col items-center">
        <svg
          className="animate-spin h-10 w-10 text-teal-600 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // const projectTags = projectDetail.tags ? JSON.parse(projectDetail.tags) : [];
  // const projectTags = Array.isArray(JSON.parse(projectDetail.tags)) ? projectDetail.tags : [];
  let projectTags = [];
  projectTags = JSON.parse(projectDetail.tags);


  // Copy URL to clipboard
  const handleCopyUrl = () => {
    const projectUrl = `${window.location.origin}/project/${projectId}`;
    navigator.clipboard.writeText(projectUrl);
    toast.success('Project URL copied to clipboard!');
  };

  // Share URL (could use the Web Share API if supported)
  const handleShareUrl = () => {
    const projectUrl = `${window.location.origin}/project/${projectId}`;
    if (navigator.share) {
      navigator.share({
        title: projectDetail.title,
        text: 'Check out this project on our platform!',
        url: projectUrl,
      }).then(() => {
        toast.success('Project URL shared successfully!');
      }).catch((error) => {
        console.error('Error sharing:', error);
        toast.error('Failed to share project URL.');
      });
    } else {
      handleCopyUrl(); // Fallback to copy if Web Share API is not supported
    }
  };

  // Check if the logged-in user is the owner of the project
  const isOwner = isAuthenticated && user.userId === projectDetail.ownerId;

  return (
    <div className="container mx-auto px-6 lg:px-20 py-10">
      {/* Project Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{projectDetail.title}</h1>
        <p className="text-lg text-gray-600 mb-4">{projectDetail.description}</p>
        <div className="flex justify-center items-center space-x-4">
          <div className="text-gray-800">
            <span className="font-semibold">Funding Goal: </span>${projectDetail.fundingGoal}
          </div>
          <div className="text-gray-800">
            <span className="font-semibold">Current Funding: </span>${projectDetail.currentFunding}
          </div>
        </div>
      </div>

      {/* Action Buttons for Project Owner */}
      {isOwner && (
        <div className="mb-8 flex justify-center space-x-4">
          <button
            onClick={() => navigate(`/dashboard/project/create`)}
            className="bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Create New Project
          </button>
          <button
            onClick={() => handleEditProject(projectDetail)}
            className="bg-yellow-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none"
          >
            <FontAwesomeIcon icon={faEdit} className="mr-2" />
            Update Project
          </button>
        </div>
      )}

      {/* Project Details Section */}
      <div className="flex flex-col lg:flex-row lg:space-x-10 mb-10">
        <img
          src={projectDetail.imageUrl || 'https://via.placeholder.com/600x400'}
          alt="Project"
          className="w-full lg:w-1/2 rounded-lg shadow-md mb-6 lg:mb-0"
        />
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Summary</h2>
          <p className="text-gray-600 mb-6">{projectDetail.description}</p>

          {/* Project Tags */}
          <div className="flex space-x-2 m-2">
            {projectTags.map((tag, index) => (
              <span key={index} className="bg-teal-200 text-teal-800 px-4 py-2 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Copy and Share Buttons */}
      <div className="mb-8 flex justify-center space-x-4">
        <button
          onClick={handleCopyUrl}
          className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
        >
          <FontAwesomeIcon icon={faCopy} className="mr-2" />
          Copy Project URL
        </button>
        <button
          onClick={handleShareUrl}
          className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 focus:outline-none"
        >
          <FontAwesomeIcon icon={faShareAlt} className="mr-2" />
          Share Project
        </button>
      </div>

      {/* Project Milestones, Contributions, Comments, etc. */}
      <Milestones milestones={projectDetail.milestones} />
      <Contributions contributions={projectDetail.contributions} />
      <Comments comments={projectDetail.reviews} />
    </div>
  );
};

export default ProjectDetail;