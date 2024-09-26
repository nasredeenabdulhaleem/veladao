import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import UpdateMilestone from './UpdateMilestone';
import { updateProject } from '../../redux/actions/projectActions';

const UpdateProjectForm = () => {
    const location = useLocation();
    const { project } = location.state;
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();




    if (project.ownerId !== user.userId) {
        return (
            <div className="container mx-auto px-6 lg:px-20 py-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Not Authorized</h2>
                <p className="text-gray-700 mb-4">You are not authorized to update this project.</p>
                <p className="text-gray-700 mb-4">Please make sure you are logged in as the owner of the project.</p>
                <Link to="/login" className="text-teal-600 hover:underline">Click here to login</Link>
            </div>
        )
    }

    // Initialize form state with existing project data
    const [title, setTitle] = useState(project.title || '');
    const [description, setDescription] = useState(project.description || '');
    const [fundingGoal, setFundingGoal] = useState(project.fundingGoal || '');
    const [endDate, setEndDate] = useState(project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '');
    const [imageUrl, setImageUrl] = useState(project.imageUrl || '');
    const [imagePreview, setImagePreview] = useState(project.imageUrl || null);
    const [milestones, setMilestones] = useState(project.milestones || []);
    const [milestoneInput, setMilestoneInput] = useState('');
    const [milestoneDueDate, setMilestoneDueDate] = useState('');
    // const [tags, setTags] = useState(Array.isArray(project.tags) ? project.tags.join(', ') : '');
    const [tags, setTags] = useState('');
    const [featured, setFeatured] = useState(project.featured || false);
    const [manager, setManager] = useState(project.manager || '');
    const [status, setStatus] = useState(project.status || '');


    useEffect(() => {
        if (project && project.tags) {
            try {
                // First parse the outer string
                const parsedTags = JSON.parse(project.tags);
                // Check if the parsed result is a string and parse it again
                const finalTags = typeof parsedTags === 'string' ? JSON.parse(parsedTags) : parsedTags;
                if (Array.isArray(finalTags)) {
                    setTags(finalTags.join(', '));
                } else {
                    console.error('Parsed tags is not an array:', finalTags);
                }
            } catch (e) {
                console.error('Failed to parse tags:', e);
            }
        }
    }, [project]);

    // Handle image upload and preview
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // Handle adding milestones
    const addMilestone = () => {
        if (milestoneInput && milestoneDueDate) {
            setMilestones([...milestones, { description: milestoneInput, dueDate: milestoneDueDate, status: 'pending' }]);
            setMilestoneInput('');
            setMilestoneDueDate('');
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const tagsString = JSON.stringify(tags.split(',').map((tag) => tag.trim()));
        // const formattedTags = tags.split(',').map((tag) => tag.trim());
        const updatedProjectData = {
            title,
            description,
            fundingGoal,
            endDate,
            imageUrl,
            tags: tagsString,
            featured,
            manager,
            status,
            milestones,
        };
        dispatch(updateProject(project.id, updatedProjectData, navigate));
    };

    return (
        <div className="container mx-auto px-6 lg:px-20 py-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Update Project</h2>

            <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Project Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter project title"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                        required
                    />
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter project description"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                        rows="5"
                        required
                    ></textarea>
                </div>

                {/* Funding Goal */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Funding Goal (USD)</label>
                    <input
                        type="number"
                        value={fundingGoal}
                        onChange={(e) => setFundingGoal(e.target.value)}
                        placeholder="Enter funding goal"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                        required
                    />
                </div>

                {/* End Date */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                        required
                    />
                </div>

                {/* Status */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                    >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                {/* Image Upload */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Project Image</label>
                    <input
                        type="file"
                        onChange={handleImageUpload}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                        accept="image/*"
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Project Preview"
                            className="mt-4 w-full h-64 object-cover rounded-lg shadow-md"
                        />
                    )}
                </div>

                {/* Milestones */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Milestones</label>
                    <div className="flex mb-2">
                        <input
                            type="text"
                            value={milestoneInput}
                            onChange={(e) => setMilestoneInput(e.target.value)}
                            placeholder="Enter milestone description"
                            className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:border-teal-500"
                        />
                        <input
                            type="date"
                            value={milestoneDueDate}
                            onChange={(e) => setMilestoneDueDate(e.target.value)}
                            className="w-full px-4 py-2 border focus:outline-none focus:border-teal-500"
                        />
                        <button
                            type="button"
                            onClick={addMilestone}
                            className="bg-teal-600 text-white px-4 py-2 rounded-r-lg hover:bg-teal-700 focus:outline-none"
                        >
                            Add
                        </button>
                    </div>
                    {/* <ul className="mt-4 space-y-2">
                        {milestones.map((milestone, index) => (
                            <li key={index} className="bg-gray-100 px-4 py-2 rounded-lg shadow-sm">
                                <div>{milestone.description}</div>
                                <div className="text-sm text-gray-600">Due: {milestone.dueDate}</div>
                                <div className="text-sm text-gray-600">Status: {milestone.status}</div>
                            </li>
                        ))}
                    </ul> */}
                    < UpdateMilestone milestones={milestones} setMilestones={setMilestones} />
                </div>

                {/* Tags */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Tags (comma-separated)</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Enter tags"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                    />
                </div>

                {/* Featured */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Featured</label>
                    <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="form-checkbox text-teal-600 focus:ring-0 focus:border-teal-500"
                    />
                    <span className="ml-2 text-gray-600">Feature this project on the homepage</span>
                </div>

                {/* Manager's Public Key */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Project Manager's Public Key</label>
                    <input
                        type="text"
                        value={manager}
                        onChange={(e) => setManager(e.target.value)}
                        placeholder="Enter manager's public key"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                        required
                    />
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-300"
                >
                    Update Project
                </button>
            </form>
        </div>
    );
};

export default UpdateProjectForm;