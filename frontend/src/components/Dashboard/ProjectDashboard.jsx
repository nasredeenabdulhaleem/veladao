// /solana-crowdfunding-platform/frontend/src/components/Dashboard/ProjectDashboard.js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjectDetail } from '../../redux/actions/projectActions';

const ProjectDashboard = () => {
  const project = useSelector((state) => state.project.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectDetail(1));
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-teal-600 mb-6">Project Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{project.title}</h2>
        <p className="text-gray-600 mb-6">{project.description}</p>
        <p className="text-teal-500 font-semibold mb-4">Funding Goal: ${project.fundingGoal}</p>

        <div>
          <p className="text-gray-800 font-semibold mb-2">Milestones:</p>
          <ul className="list-disc pl-6">
            {project?.milestones?.map(milestone => (
              <li key={milestone.id} className="text-gray-600 mb-2">
                {milestone.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;