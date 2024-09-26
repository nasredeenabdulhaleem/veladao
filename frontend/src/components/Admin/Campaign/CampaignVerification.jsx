import React, { useState } from 'react';
import PendingCampaignList from './PendingCampaignList';
import CampaignDetails from './CampaignDetails';
import RequestDocsModal from './RequestDocsModal';

const CampaignVerification = () => {
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [isRequestModalOpen, setRequestModalOpen] = useState(false);

    const campaigns = [
        // Example pending campaigns data
        { id: 1, title: 'Project Alpha', ownerName: 'John Doe', fundingGoal: 10000, endDate: '2024-09-30T12:51:05.000Z', fundUsagePlanUrl: '/fund-usage-alpha.pdf', identificationDocsUrl: '/id-alpha.pdf', submittedAt: '2024-08-31T12:51:05.000Z' },
        { id: 2, title: 'Project Beta', ownerName: 'Jane Smith', fundingGoal: 20000, endDate: '2024-10-30T12:51:05.000Z', fundUsagePlanUrl: '/fund-usage-beta.pdf', identificationDocsUrl: '/id-beta.pdf', submittedAt: '2024-08-31T12:51:05.000Z' }
    ];

    const handleApprove = (campaignId) => {
        console.log('Approving campaign:', campaignId);
        // Add API call logic to approve the campaign
    };

    const handleReject = (campaignId) => {
        console.log('Rejecting campaign:', campaignId);
        // Add API call logic to reject the campaign
    };

    const handleRequestDocs = (campaignId, message) => {
        console.log('Requesting additional docs for campaign:', campaignId, 'Message:', message);
        // Add API call logic to request additional documents
    };

    return (
        <div>
            {!selectedCampaign ? (
                <PendingCampaignList campaigns={campaigns} onSelectCampaign={setSelectedCampaign} />
            ) : (
                <>
                    <button className='bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-700 focus:outline-none' onClick={() => { setSelectedCampaign(false) }}>Back to Campaigns</button>
                    <CampaignDetails
                        campaign={selectedCampaign}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onRequestDocs={() => setRequestModalOpen(true)}
                    /></>
            )}

            {/* Request Additional Documents Modal */}
            {isRequestModalOpen && (

                <RequestDocsModal
                    campaign={selectedCampaign}
                    onRequestDocs={handleRequestDocs}
                    closeModal={() => setRequestModalOpen(false)}
                />
            )}
        </div>
    );
};

export default CampaignVerification;
