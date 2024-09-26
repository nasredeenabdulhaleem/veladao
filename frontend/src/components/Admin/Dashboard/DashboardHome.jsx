import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDashboardMetrics } from '../../../redux/actions/dashboardActions'; // Assuming you have a Redux action to fetch dashboard metrics
import {
    LineChart, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'; // For rendering charts
import { XAxis, YAxis } from './RechartsWrappers';

const AdminDashboardHome = () => {
    const dispatch = useDispatch();
    const { loading, error, totalUsers, totalProjects, totalAmountRaised, totalDonations, recentActivities, fundingTrends } = useSelector((state) => state.dashboard);

    // Fetch dashboard data when component mounts
    useEffect(() => {
        dispatch(getDashboardMetrics());
    }, [dispatch]);

    if (loading) {
        return <div className="text-blue-600 font-bold my-5 p-3 border border-blue-600 bg-blue-100 rounded">Loading...</div>;
    }

    if (error) {
        return (
            <div className="text-teal-800 font-bold my-5 p-3 border border-brandTeal-dark bg-teal-300 rounded">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 lg:px-20 py-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h2>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
                    <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <h3 className="text-lg font-semibold text-gray-600">Total Projects</h3>
                    <p className="text-2xl font-bold text-gray-800">{totalProjects}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <h3 className="text-lg font-semibold text-gray-600">Amount Raised</h3>
                    <p className="text-2xl font-bold text-gray-800">${totalAmountRaised}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <h3 className="text-lg font-semibold text-gray-600">Total Donations</h3>
                    <p className="text-2xl font-bold text-gray-800">{totalDonations}</p>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Activities</h3>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <ul>
                        {recentActivities.length > 0 ? (
                            recentActivities.map((activity, index) => (
                                <li key={index} className="mb-4 flex items-center">
                                    <div className="bg-teal-100 text-teal-600 rounded-full h-8 w-8 flex items-center justify-center mr-4">
                                        <span className="text-lg font-semibold">{activity.icon}</span>
                                    </div>
                                    <p className="text-gray-600">{activity.message}</p>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-600">No recent activities.</p>
                        )}
                    </ul>
                </div>
            </div>

            {/* Funding Trends Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Funding Trends</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={fundingTrends}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis xAxisId="x-axis-1" />
                        <YAxis yAxisId="y-axis-1" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="amount" stroke="#38b2ac" activeDot={{ r: 8 }} xAxisId="x-axis-1" yAxisId="y-axis-1" /> {/* Use brand teal color */}                        {/* Use brand teal color */}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminDashboardHome;
