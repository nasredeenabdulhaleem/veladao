import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectDetail } from '../../redux/actions/projectActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faCopy, faShareAlt, faCalendarAlt, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import ContributeToProject from '../Contribution/ContributeToProject';
import { toast } from 'react-toastify';

const ProjectDetailPage = () => {
    const { projectDetail, projectDetailError } = useSelector((state) => state.project);
    const { projectId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [tags, setTags] = useState([]);

    const [activeTab, setActiveTab] = useState('Overview');

    useEffect(() => {
        dispatch(getProjectDetail(projectId));
    }, [dispatch, projectId]);

    useEffect(() => {
        if (projectDetail && projectDetail.tags) {
            try {
                setTags(JSON.parse(projectDetail.tags));

            } catch (e) {
                console.error('Failed to parse tags:', e);
            }
        }
    }, [projectDetail]);

    if (!projectDetail) {
        return (
            <div className="container mx-auto p-6 bg-gray-50 flex flex-col items-center justify-center min-h-screen">
                {/* Back to Home Button */}
                <button
                    onClick={() => navigate('/')}
                    className="bg-teal-200 text-teal-800 font-semibold py-2 px-4 rounded-full hover:bg-teal-300 transition duration-300 mb-6"
                >
                    Back to Home
                </button>
                {projectDetailError ? (
                    <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md">
                        <p>{projectDetailError.error}</p>
                    </div>
                ) : (
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
                )}
            </div>
        );
    };

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

    // Example project data (replace with real data)
    const { title, description, fundingGoal, currentFunding, endDate, milestones, contributions, reviews } = projectDetail;
    // const tags = JSON.parse(projectDetail.tags);
    // const tags = Array.isArray(projectDetail.tags) ? projectDetail.tags : JSON.parse(projectDetail.tags || '[]');
    return (
        <div className="container mx-auto px-6 lg:px-20 py-10">
            {/* Back to Home Button */}
            <button
                onClick={() => navigate('/')}
                className="bg-teal-200 text-teal-800 font-semibold py-2 px-4 rounded-full hover:bg-teal-300 transition duration-300 mb-6"
            >
                Back to Home
            </button>

            {/* Project Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
                <p className="text-lg text-gray-600 mb-4">{description}</p>
                <div className="flex justify-center items-center space-x-4">
                    <div className="text-gray-800">
                        <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                        <span>Funding Goal: ${fundingGoal}</span>
                    </div>
                    <div className="text-gray-800">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                        <span>End Date: {new Date(endDate).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            {/* Project Image and Summary */}
            <div className="flex flex-col lg:flex-row lg:space-x-10 mb-10">
                <img
                    src="https://via.placeholder.com/600x400"
                    alt="Project"
                    className="w-full lg:w-1/2 rounded-lg shadow-md mb-6 lg:mb-0"
                />
                <div className="lg:w-1/2">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Summary</h2>
                    <p className="text-gray-600 mb-6">{description}</p>
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-gray-800">
                            <span className="font-semibold">Current Funding: </span>${currentFunding}
                        </div>
                        <div className="text-gray-800">
                            <span className="font-semibold">Funding Goal: </span>${fundingGoal}
                        </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                        <div
                            className="bg-teal-600 h-4 rounded-full"
                            style={{ width: `${(currentFunding / fundingGoal) * 100}%` }}
                        ></div>
                    </div>
                    <ContributeToProject projectPublicKey='2dgFSh4jT2NjzMGotXEifXoidMdHZbb5Jd7UiTTNEaLu' />
                    {/* Tags */}
                    <div className="flex space-x-2 mt-2">
                        {Array.isArray(tags) && tags.map((tag, index) => (
                            <span key={index} className="bg-teal-200 text-teal-800 px-4 py-2 rounded-full text-sm">
                                <FontAwesomeIcon icon={faTag} className="mr-1" />
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
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
            </div>

            {/* Tabs Navigation */}
            <div className="mb-10">
                <ul className="flex border-b-2 border-gray-300">
                    {['Overview', 'Updates', 'Contributions', 'Comments'].map((tab) => (
                        <li
                            key={tab}
                            className={`px-4 py-2 cursor-pointer ${activeTab === tab ? 'border-teal-600 text-teal-600 border-b-2' : 'text-gray-600'}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'Overview' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Overview</h2>
                        <p className="text-gray-600">{description}</p>
                        {/* Milestones */}
                        {milestones.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Milestones</h3>
                                <ul className="space-y-2">
                                    {milestones.map((milestone) => (
                                        <li key={milestone.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                            <h4 className="font-semibold text-gray-800">{milestone.description}</h4>
                                            <p className="text-gray-600">Due Date: {new Date(milestone.dueDate).toLocaleDateString()}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === 'Updates' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Updates</h2>
                        <p className="text-gray-600">No updates available yet.</p>
                    </div>
                )}
                {activeTab === 'Contributions' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Contributions</h2>
                        <ul className="space-y-2">
                            {contributions.length > 0 ? (
                                contributions.map((contribution) => (
                                    <li key={contribution.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                        <p className="text-gray-800">Contribution ID: {contribution.ref}</p>
                                        <p className="text-gray-600">Amount: ${contribution.amount}</p>
                                        <p className="text-gray-600">Date: {new Date(contribution.createdAt).toLocaleDateString()}</p>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-600">No contributions yet.</p>
                            )}
                        </ul>
                    </div>
                )}
                {activeTab === 'Comments' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>
                        <ul className="space-y-2">
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <li key={review.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                        <p className="font-semibold text-gray-800">{review.comment}</p>
                                        <p className="text-gray-600">Rating: {review.rating}/5</p>
                                        <p className="text-gray-600">Date: {new Date(review.createdAt).toLocaleDateString()}</p>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-600">No comments yet.</p>
                            )}
                        </ul>
                    </div>
                )}
            </div>

            {/* Contribute Section */}
            <div className="mt-10 bg-teal-600 text-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Support This Project</h2>
                <p className="text-lg mb-6">Your contribution can help make this project a reality. Every little bit counts!</p>
                <button className="bg-white text-teal-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300">
                    Contribute Now
                </button>
            </div>
        </div>
    );
};

export default ProjectDetailPage;