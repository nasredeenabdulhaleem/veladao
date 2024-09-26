import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsers, updateUserStatus, assignUserRole } from '../../../redux/actions/userActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faLock, faUnlock, faUserShield } from '@fortawesome/free-solid-svg-icons';

const UserList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { users, loading, error } = useSelector((state) => state.user);
    const [filterRole, setFilterRole] = useState('');

    useEffect(() => {
        dispatch(getUsers()); // Fetch all users
    }, [dispatch]);

    // Handle role filtering
    const filteredUsers = users.filter(user =>
        !filterRole || user.role === filterRole
    );

    // Handle block/unblock user
    const handleStatusChange = (userId, newStatus) => {
        dispatch(updateUserStatus(userId, newStatus));
    };

    // Handle role assignment
    const handleAssignRole = (userId, newRole) => {
        dispatch(assignUserRole(userId, newRole));
    };
    const handleUpdate = (user) => {
        navigate("/admin/users/update", { state: { user } });
    }

    return (
        <div className="container mx-auto px-6 lg:px-20 py-10">
            <h1 className="text-3xl font-bold text-teal-600 mb-8">User Management</h1>

            {/* Role Filter */}
            <div className="mb-6 flex space-x-4">
                <select
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}>
                    <option value="">All Roles</option>
                    <option value="donor">Donor</option>
                    <option value="projectOwner">Project Owner</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            {/* User List Table */}
            {loading ? (
                <p className="text-teal-500">Loading...</p>
            ) : error ? (
                <p className="bg-red-200 text-red-500">Error loading users</p>

            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr>
                                <th className="text-left px-6 py-4 bg-teal-500 text-white">Username</th>
                                <th className="text-left px-6 py-4 bg-teal-500 text-white">Email</th>
                                <th className="text-left px-6 py-4 bg-teal-500 text-white">Role</th>
                                <th className="text-left px-6 py-4 bg-teal-500 text-white">Status</th>
                                <th className="text-left px-6 py-4 bg-teal-500 text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-t border-gray-200">
                                    <td className="px-6 py-4">{user.username}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.role}</td>
                                    <td className="px-6 py-4">{user.status === 'active' ? 'Active' : 'Blocked'}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-4">
                                            {/* Block/Unblock */}
                                            {user.status === 'active' ? (
                                                <button
                                                    onClick={() => handleStatusChange(user.id, 'blocked')}
                                                    className="text-yellow-500 hover:text-yellow-600">
                                                    <FontAwesomeIcon icon={faLock} />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleStatusChange(user.id, 'active')}
                                                    className="text-green-500 hover:text-green-600">
                                                    <FontAwesomeIcon icon={faUnlock} />
                                                </button>
                                            )}

                                            {/* Assign Role */}
                                            <button
                                                onClick={() => handleAssignRole(user.id, 'admin')}
                                                className="text-blue-500 hover:text-blue-600">
                                                <FontAwesomeIcon icon={faUserShield} />
                                            </button>

                                            {/* Edit User */}
                                            <button
                                                onClick={() => handleUpdate(user)}
                                                className="text-teal-500 hover:text-teal-600">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>

                                            {/* Delete User */}
                                            <button
                                                className="text-red-500 hover:text-red-600">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserList;
