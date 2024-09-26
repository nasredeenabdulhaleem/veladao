import React, { useState, useEffect } from 'react';
import MilestoneList from './MilestoneList';
import MilestoneApprovalModal from './MilestoneApprovalModal';
import FundReleaseModal from './FundReleaseModal';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../../redux/actions/projectActions';

const MilestoneAndFundManagement = () => {
    const { projects } = useSelector((state) => state.project);
    const dispatch = useDispatch();
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [isMilestoneModalOpen, setMilestoneModalOpen] = useState(false);
    const [isFundReleaseModalOpen, setFundReleaseModalOpen] = useState(false);
    const project = projects[0];
    const milestones = project ? project.milestones : [];

    useEffect(() => {
        dispatch(getProjects());
    }, [])

    const handleApprove = (milestoneId, comments) => {
        // API call to approve the milestone with comments
        console.log('Approved Milestone', milestoneId, comments);
    };

    const handleRequestMoreInfo = (milestoneId, comments) => {
        // API call to request more information with comments
        console.log('Requested More Info for Milestone', milestoneId, comments);
    };

    const handleReleaseFunds = (projectId, amount) => {
        // API call to release funds for the project
        console.log('Released Funds', projectId, amount);
    };

    return (
        <div>
            <MilestoneList
                milestones={milestones}
                onApprove={(milestoneId) => {
                    setSelectedMilestone(milestones.find(m => m.id === milestoneId));
                    setMilestoneModalOpen(true);
                }}
                onRequestMoreInfo={(milestoneId) => {
                    setSelectedMilestone(milestones.find(m => m.id === milestoneId));
                    setMilestoneModalOpen(true);
                }}
                onhandleRelease={(milestoneId) => {
                    setSelectedMilestone(milestones.find(m => m.id === milestoneId));
                    setFundReleaseModalOpen(true);
                }}
            />

            <MilestoneApprovalModal
                isOpen={isMilestoneModalOpen}
                onClose={() => setMilestoneModalOpen(false)}
                milestone={selectedMilestone}
                onApprove={handleApprove}
                onRequestMoreInfo={handleRequestMoreInfo}
            />

            <FundReleaseModal
                isOpen={isFundReleaseModalOpen}
                onClose={() => setFundReleaseModalOpen(false)}
                project={project}
                onReleaseFunds={handleReleaseFunds}
            />
        </div>
    );
};

export default MilestoneAndFundManagement;
