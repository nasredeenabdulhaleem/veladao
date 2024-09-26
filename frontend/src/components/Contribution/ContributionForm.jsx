// /solana-crowdfunding-platform/frontend/src/components/Contribution/ContributionForm.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContribution } from '../../redux/actions/contributionActions';

const ContributionForm = ({ projectId }) => {
  const [contributionAmount, setContributionAmount] = useState('');
  const dispatch = useDispatch();

  const handleContribution = () => {
    dispatch(addContribution(projectId, contributionAmount));
    setContributionAmount('');
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-teal-600 mb-4">Contribute to Project</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <input
            type="number"
            placeholder="Enter contribution amount"
            value={contributionAmount}
            onChange={(e) => setContributionAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <button
          onClick={handleContribution}
          className="w-full bg-teal-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-700 transition duration-300"
        >
          Contribute
        </button>
      </div>
    </div>

  );
};

export default ContributionForm;