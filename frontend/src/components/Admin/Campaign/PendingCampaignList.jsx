import React, { useState } from 'react';

const PendingCampaignList = ({ campaigns, onSelectCampaign }) => {
    return (
        <div className="container mx-auto px-6 lg:px-20 py-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Pending Campaigns for Verification</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                        <h3 className="text-xl font-semibold text-gray-800">{campaign.title}</h3>
                        <p className="text-gray-600 mb-4">Submitted by: {campaign.ownerName}</p>
                        <p className="text-gray-600 mb-4">Submitted on: {new Date(campaign.submittedAt).toLocaleDateString()}</p>
                        <button
                            className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-700 focus:outline-none"
                            onClick={() => onSelectCampaign(campaign)}
                        >
                            View Campaign
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PendingCampaignList;
