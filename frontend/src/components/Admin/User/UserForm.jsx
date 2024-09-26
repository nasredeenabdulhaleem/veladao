import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser, updateUser } from '../../../redux/actions/userActions';

const UserForm = () => {
    const location = useLocation();
    const { user } = location.state;
    const [formData, setFormData] = useState({
        username: user ? user.username : '',
        email: user ? user.email : '',
        role: user ? user.role : 'donor',
    });

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) {
            dispatch(updateUser(user.id, formData)); // Update user
        } else {
            dispatch(createUser(formData)); // Create new user
        }
    };

    return (
        <div className="container mx-auto px-6 lg:px-20 py-10">
            <h1 className="text-3xl font-bold text-teal-600 mb-8">{user ? 'Edit User' : 'Add User'}</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Username</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Role</label>
                    <select
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                        <option value="donor">Donor</option>
                        <option value="projectOwner">Project Owner</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button type="submit" className="bg-teal-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-teal-700">
                    {user ? 'Update User' : 'Add User'}
                </button>
            </form>
        </div>
    );
};

export default UserForm;
