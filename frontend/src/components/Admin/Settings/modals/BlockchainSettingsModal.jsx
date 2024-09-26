import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { upsertSetting } from '../../../../redux/actions/settingsActions';

const BlockchainSettingsModal = ({ isOpen, onClose }) => {
    const [network, setNetwork] = useState('mainnet-beta');
    const [rpcUrl, setRpcUrl] = useState('');
    const dispatch = useDispatch();

    const handleSaveSettings = () => {
        // API call to save blockchain settings
        const blockchainSetting = { key: "blockchain_mode", value: network }
        const blockchainUrl = { key: "blockchain_mode_url", value: rpcUrl }
        dispatch(upsertSetting(blockchainSetting))
        dispatch(upsertSetting(blockchainUrl))
        console.log('Saving Blockchain Settings:', { network, rpcUrl });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Blockchain Settings</h2>

                <label className="block text-gray-700 font-medium mb-2">Network</label>
                <select
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500 mb-4"
                >
                    <option value="mainnet-beta">Mainnet Beta</option>
                    <option value="devnet">Devnet</option>
                    <option value="testnet">Testnet</option>
                    <option value="localnet">Localnet</option>
                </select>

                <label className="block text-gray-700 font-medium mb-2">RPC URL</label>
                <input
                    type="text"
                    value={rpcUrl}
                    onChange={(e) => setRpcUrl(e.target.value)}
                    placeholder="Enter RPC URL"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500 mb-4"
                />

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100 transition duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveSettings}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition duration-200"
                    >
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlockchainSettingsModal;
