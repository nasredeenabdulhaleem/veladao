import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllContributions } from '../../../redux/actions/contributionActions'; // Fetch action
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const AdminContributionList = () => {
    const dispatch = useDispatch();
    const { allContributions, loading } = useSelector((state) => state.contribution);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        dispatch(fetchAllContributions());
    }, [dispatch]);

    const handleSearch = (e) => setSearchTerm(e.target.value);
    const handleFilterChange = (e) => setFilter(e.target.value);

    const filteredContributions = allContributions.filter((contribution) => {
        return (
            contribution.project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contribution.project.owner.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Contribution List</h1>
            <div className="flex justify-between mb-6">
                <div className="relative">
                    <input
                        type="text"
                        className="border border-gray-300 px-4 py-2 rounded-lg w-64"
                        placeholder="Search by project or user"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <FontAwesomeIcon icon={faSearch} className="absolute top-3 right-4 text-gray-500" />
                </div>
                <select
                    className="border border-gray-300 px-4 py-2 rounded-lg"
                    value={filter}
                    onChange={handleFilterChange}
                >
                    <option value="all">All</option>
                    <option value="successful">Successful</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                </select>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2">Project</th>
                            <th className="px-4 py-2">User</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredContributions.map((contribution) => (
                            <tr key={contribution.id}>
                                <td className="border px-4 py-2">{contribution.project.title}</td>
                                <td className="border px-4 py-2">{contribution.project.owner.email}</td>
                                <td className="border px-4 py-2">${contribution.amount}</td>
                                <td className="border px-4 py-2">{new Date(contribution.createdAt).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded-full ${contribution.status === 'successful'
                                            ? 'bg-green-100 text-green-800'
                                            : contribution.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        {contribution.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminContributionList;
