import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionLogs } from '../../redux/actions/transactionActions';
import TransactionDetailsModal from './TransactionDetailsModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const TransactionLogsPage = () => {
    const dispatch = useDispatch();
    const { transactions, loading } = useSelector((state) => state.transactions);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    useEffect(() => {
        dispatch(fetchTransactionLogs());
    }, [dispatch]);

    const handleSearch = (e) => setSearchTerm(e.target.value);
    const handleFilterChange = (e) => setFilter(e.target.value);

    const filteredTransactions = transactions.filter((transaction) => {
        return (
            (filter === 'all' || transaction.status === filter) &&
            (transaction.transactionId.includes(searchTerm) ||
                transaction.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Transaction Logs</h1>

            {/* Search and Filter Section */}
            <div className="flex justify-between mb-6">
                <div className="relative">
                    <input
                        type="text"
                        className="border border-gray-300 px-4 py-2 rounded-lg w-64"
                        placeholder="Search by transaction, project or user"
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

            {/* Transaction Logs Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Transaction ID</th>
                            <th className="px-4 py-2 text-left">Project</th>
                            <th className="px-4 py-2 text-left">User</th>
                            <th className="px-4 py-2 text-left">Amount</th>
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            filteredTransactions.map((transaction) => (
                                <tr key={transaction.transactionId}>
                                    <td className="border px-4 py-2">{transaction.transactionId}</td>
                                    <td className="border px-4 py-2">{transaction.projectName}</td>
                                    <td className="border px-4 py-2">{transaction.userName}</td>
                                    <td className="border px-4 py-2">${transaction.amount}</td>
                                    <td className="border px-4 py-2">{new Date(transaction.date).toLocaleDateString()}</td>
                                    <td className="border px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded-full ${transaction.status === 'successful'
                                                    ? 'bg-green-100 text-green-800'
                                                    : transaction.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {transaction.status}
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <button
                                            onClick={() => setSelectedTransaction(transaction)}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
                <button className="px-4 py-2 bg-gray-200 rounded-lg mr-2">Previous</button>
                <button className="px-4 py-2 bg-gray-200 rounded-lg">Next</button>
            </div>

            {/* Transaction Details Modal */}
            {selectedTransaction && (
                <TransactionDetailsModal
                    transaction={selectedTransaction}
                    onClose={() => setSelectedTransaction(null)}
                />
            )}
        </div>
    );
};

export default TransactionLogsPage;
