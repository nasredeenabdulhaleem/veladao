import React from 'react';
import ProjectList from '../Project/ProjectList';

const UserDashboard = () => {

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-teal-600 mb-4">User Dashboard</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <ProjectList />
      </div>
    </div>

  );
};

export default UserDashboard;