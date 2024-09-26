import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/main.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import ProjectList from './components/Landing/ProjectList';
import ProjectDetail from './components/Project/ProjectDetail';
import CreateProject from './components/Project/CreateProject';
import ContributionForm from './components/Contribution/ContributionForm';
import ContributionList from './components/Contribution/ContributionList';
import ProfilePage from './components/Profile/ProfilePage';
import ReviewForm from './components/Review/ReviewForm';
import ReviewList from './components/Review/ReviewList';
import AuthRoute from './components/Auth/AuthRoute';
import Home from './components/Landing/Home';
import ProjectDetailPage from './components/Landing/ProjectDetailPage';
import CreateProjectForm from './components/Project/CreateProjectForm';
import UpdateProjectForm from './components/Project/UpdateProjectForm';
import DashboardHome from './components/Dashboard/DashboardHome';
import Projects from './components/Project/Projects';
import NotFound from './components/Error/NotFound';
import TermsAndConditions from './components/Landing/TermsAndConditions';
import AdminDashboardLayout from './components/Admin/Dashboard/DashboardLayout';
import AdminDashboardHome from './components/Admin/Dashboard/DashboardHome';
import UserList from './components/Admin/User/UserList';
import UserForm from './components/Admin/User/UserForm';
import AdminProjectList from './components/Admin/Projects/ProjectList';
import CampaignVerification from './components/Admin/Campaign/CampaignVerification';
import AdminContributionList from './components/Admin/Contribution/ContributionList';
import ReportingAnalytics from './components/Admin/Reporting/ReportingAnalytics';
import AdminNotificationPage from './components/Admin/Notification/AdminNotificationPage';
import NotificationPage from './components/Admin/Notification/NotificationPage';
import NewsletterPage from './components/Admin/Notification/NewsletterPage';
import AnnouncementPage from './components/Admin/Notification/AnnouncementPage';
import CMSPage from './components/Admin/CMS/CMSPage';
import EditHomepage from './components/Admin/CMS/EditHomepage';
import ManageFAQs from './components/Admin/CMS/ManageFAQs';
import EditLegalDocuments from './components/Admin/CMS/EditLegalDocuments';
import ManageReviews from './components/Admin/CMS/ManageReviews';
import MilestoneAndFundManagement from './components/Admin/Milestone/MilestoneAndFundManagement';
import AppSettings from './components/Admin/Settings/AppSettings';
import MaintenanceMode from './components/MaintenanceMode';
import { getSetting } from './redux/actions/settingsActions';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const isMaintenanceMode = useSelector((state) => state.settings.settings.maintenance_mode);

  useEffect(() => {
    // Fetch critical app settings on load
    dispatch(getSetting('platform_fee'));
    dispatch(getSetting('maintenance_mode'));
    dispatch(getSetting('smtp_server'));
    dispatch(getSetting('blockchain_mode'));
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {isMaintenanceMode ? (
          // Render only admin dashboard routes during maintenance mode
          <Route>
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminDashboardLayout />}>

              <Route index element={<AuthRoute requiredRole="admin"><AdminDashboardHome /></AuthRoute>} />
              <Route path="users" element={<AuthRoute requiredRole="admin"><UserList /></AuthRoute>} />
              <Route path="users/update" element={<AuthRoute requiredRole="admin"><UserForm /></AuthRoute>} />
              <Route path="projects" element={<AuthRoute requiredRole="admin"><AdminProjectList /></AuthRoute>} />
              <Route path="campaign" element={<AuthRoute requiredRole="admin"><CampaignVerification /></AuthRoute>} />
              <Route path="contribution" element={<AuthRoute requiredRole="admin"><AdminContributionList /></AuthRoute>} />
              <Route path="report" element={<AuthRoute requiredRole="admin"><ReportingAnalytics /></AuthRoute>} />
              <Route path="notifications" element={<AuthRoute requiredRole="admin"><AdminNotificationPage /></AuthRoute>} />
              <Route path="notifications/notification" element={<AuthRoute requiredRole="admin"><NotificationPage /></AuthRoute>} />
              <Route path="notifications/newsletter" element={<AuthRoute requiredRole="admin"><NewsletterPage /></AuthRoute>} />
              <Route path="notifications/announcement" element={<AuthRoute requiredRole="admin"><AnnouncementPage /></AuthRoute>} />
              <Route path="cms" element={<AuthRoute requiredRole="admin"><CMSPage /></AuthRoute>} />
              <Route path="cms/homepage" element={<AuthRoute requiredRole="admin"><EditHomepage /></AuthRoute>} />
              <Route path="cms/faqs" element={<AuthRoute requiredRole="admin"><ManageFAQs /></AuthRoute>} />
              <Route path="cms/legal" element={<AuthRoute requiredRole="admin"><EditLegalDocuments /></AuthRoute>} />
              <Route path="cms/reviews" element={<AuthRoute requiredRole="admin"><ManageReviews /></AuthRoute>} />
              <Route path="milestone" element={<AuthRoute requiredRole="admin"><MilestoneAndFundManagement /></AuthRoute>} />
              <Route path="settings" element={<AuthRoute requiredRole="admin"><AppSettings /></AuthRoute>} />
            </Route></Route>
        ) : (
          // Render full application routes when not in maintenance mode
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/project/:projectId" element={<ProjectDetailPage />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/create-project" element={<AuthRoute requiredRole="user"><CreateProject /></AuthRoute>} />
            <Route path="/contribute/:id" element={<AuthRoute requiredRole="user"><ContributionForm /></AuthRoute>} />
            <Route path="/:projectId/contributions" element={<AuthRoute requiredRole="user"><ContributionList /></AuthRoute>} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<AuthRoute requiredRole="user"><DashboardHome /></AuthRoute>} />
              <Route path="profile" element={<AuthRoute requiredRole="user"><ProfilePage /></AuthRoute>} />
              <Route path="projects" element={<AuthRoute requiredRole="user"><Projects /></AuthRoute>} />
              <Route path="create" element={<AuthRoute requiredRole="user"><CreateProjectForm /></AuthRoute>} />
              <Route path="project/:projectId" element={<AuthRoute requiredRole="user"><ProjectDetail /></AuthRoute>} />
              <Route path="update/:projectId" element={<AuthRoute requiredRole="user"><UpdateProjectForm /></AuthRoute>} />
            </Route>
            <Route path="/admin" element={<AdminDashboardLayout />}>
              <Route index element={<AuthRoute requiredRole="admin"><AdminDashboardHome /></AuthRoute>} />
              <Route path="users" element={<AuthRoute requiredRole="admin"><UserList /></AuthRoute>} />
              <Route path="users/update" element={<AuthRoute requiredRole="admin"><UserForm /></AuthRoute>} />
              <Route path="projects" element={<AuthRoute requiredRole="admin"><AdminProjectList /></AuthRoute>} />
              <Route path="campaign" element={<AuthRoute requiredRole="admin"><CampaignVerification /></AuthRoute>} />
              <Route path="contribution" element={<AuthRoute requiredRole="admin"><AdminContributionList /></AuthRoute>} />
              <Route path="report" element={<AuthRoute requiredRole="admin"><ReportingAnalytics /></AuthRoute>} />
              <Route path="notifications" element={<AuthRoute requiredRole="admin"><AdminNotificationPage /></AuthRoute>} />
              <Route path="notifications/notification" element={<AuthRoute requiredRole="admin"><NotificationPage /></AuthRoute>} />
              <Route path="notifications/newsletter" element={<AuthRoute requiredRole="admin"><NewsletterPage /></AuthRoute>} />
              <Route path="notifications/announcement" element={<AuthRoute requiredRole="admin"><AnnouncementPage /></AuthRoute>} />
              <Route path="cms" element={<AuthRoute requiredRole="admin"><CMSPage /></AuthRoute>} />
              <Route path="cms/homepage" element={<AuthRoute requiredRole="admin"><EditHomepage /></AuthRoute>} />
              <Route path="cms/faqs" element={<AuthRoute requiredRole="admin"><ManageFAQs /></AuthRoute>} />
              <Route path="cms/legal" element={<AuthRoute requiredRole="admin"><EditLegalDocuments /></AuthRoute>} />
              <Route path="cms/reviews" element={<AuthRoute requiredRole="admin"><ManageReviews /></AuthRoute>} />
              <Route path="milestone" element={<AuthRoute requiredRole="admin"><MilestoneAndFundManagement /></AuthRoute>} />
              <Route path="settings" element={<AuthRoute requiredRole="admin"><AppSettings /></AuthRoute>} />
            </Route>
            <Route path="/review/:id" element={<AuthRoute requiredRole="user"><ReviewForm /></AuthRoute>} />
            <Route path="/reviews" element={<AuthRoute requiredRole="user"><ReviewList /></AuthRoute>} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;