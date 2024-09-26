import React from 'react';

const CampaignDetails = ({ campaign, onApprove, onReject, onRequestDocs }) => {
  return (
    <div className="container mx-auto px-6 lg:px-20 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Campaign Details</h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Title: {campaign.title}</h3>
        <p className="text-gray-600 mb-4"><strong>Description:</strong> {campaign.description}</p>
        <p className="text-gray-600 mb-4"><strong>Submitted by:</strong> {campaign.ownerName}</p>
        <p className="text-gray-600 mb-4"><strong>Submitted on:</strong> {new Date(campaign.submittedAt).toLocaleDateString()}</p>
        <p className="text-gray-600 mb-4"><strong>Funding Goal:</strong> ${campaign.fundingGoal}</p>
        <p className="text-gray-600 mb-4"><strong>End Date:</strong> {new Date(campaign.endDate).toLocaleDateString()}</p>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-4">Documentation</h3>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Fund Usage Plan</h4>
        <iframe
          src={campaign.fundUsagePlanUrl}
          className="w-full h-64 border"
          title="Fund Usage Plan"
        ></iframe>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Identification Documents</h4>
        <iframe
          src={campaign.identificationDocsUrl}
          className="w-full h-64 border"
          title="Identification Documents"
        ></iframe>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between mt-8">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 focus:outline-none"
          onClick={() => onApprove(campaign.id)}
        >
          Approve Campaign
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 focus:outline-none"
          onClick={() => onReject(campaign.id)}
        >
          Reject Campaign
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 focus:outline-none"
          onClick={() => onRequestDocs(campaign.id)}
        >
          Request Additional Documents
        </button>
      </div>
    </div>
  );
};

export default CampaignDetails;
