// /solana-crowdfunding-platform/frontend/src/components/Project/CreateProject.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewProject } from '../../redux/actions/projectActions';

const CreateProject = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fundingGoal, setFundingGoal] = useState('');
  const [milestones, setMilestones] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFundingGoalChange = (e) => {
    setFundingGoal(e.target.value);
  };

  const handleMilestoneChange = (e, index) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = e.target.value;
    setMilestones(updatedMilestones);
  };

  const handleAddMilestone = () => {
    setMilestones([...milestones, '']);
  };

  const handleRemoveMilestone = (index) => {
    const updatedMilestones = [...milestones];
    updatedMilestones.splice(index, 1);
    setMilestones(updatedMilestones);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      title,
      description,
      fundingGoal,
      milestones,
    };
    dispatch(createNewProject(projectData));
    // Reset form fields
    setTitle('');
    setDescription('');
    setFundingGoal('');
    setMilestones([]);
  };

  return (
    <div class="container mx-auto p-6 bg-gray-50">
      <h2 class="text-2xl font-bold text-teal-600 mb-6">Create Project</h2>
      <form onSubmit={handleSubmit} class="bg-white shadow-md rounded-lg p-6">
        <div class="mb-4">
          <label htmlFor="title" class="block text-gray-700 font-semibold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div class="mb-4">
          <label htmlFor="description" class="block text-gray-700 font-semibold mb-2">
            Description:
          </label>
          <textarea
            id="description"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <div class="mb-4">
          <label htmlFor="fundingGoal" class="block text-gray-700 font-semibold mb-2">
            Funding Goal:
          </label>
          <input
            type="number"
            id="fundingGoal"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={fundingGoal}
            onChange={handleFundingGoalChange}
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Milestones:</label>
          {milestones.map((milestone, index) => (
            <div key={index} class="flex items-center mb-2">
              <input
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={milestone}
                onChange={(e) => handleMilestoneChange(e, index)}
                required
              />
              <button
                type="button"
                class="ml-2 text-coral-500 hover:text-coral-600"
                onClick={() => handleRemoveMilestone(index)}
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          ))}
          <button
            type="button"
            class="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            onClick={handleAddMilestone}
          >
            Add Milestone
          </button>
        </div>
        <button
          type="submit"
          class="w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          Create
        </button>
      </form>
    </div>

  );
};

export default CreateProject;