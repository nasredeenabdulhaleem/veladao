// /solana-crowdfunding-platform/frontend/src/components/Contribution/ContributionList.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContributions } from '../../redux/actions/contributionActions';
import { useParams } from 'react-router-dom';


const ContributionList = () => {
  const contributions = useSelector(state => state.contribution.contributions);
  const dispatch = useDispatch();
  const { projectId } = useParams();

  console.log("contributions", contributions);

  useEffect(() => {
    dispatch(fetchContributions(projectId));
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-teal-600 mb-4">Contributions</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        {contributions.length === 0 ? (
          <p className="text-gray-600">No contributions found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {contributions.map(contribution => (
              <li key={contribution.id} className="py-4">
                <p className="text-gray-800 font-semibold">Amount: ${contribution.amount}</p>
                <p className="text-gray-600">Project: {contribution.project}</p>
                <p className="text-gray-600">User: {contribution.user}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>

  );
};

export default ContributionList;