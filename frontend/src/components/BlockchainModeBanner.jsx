import React from 'react';
import { useSelector } from 'react-redux'; // Assuming blockchain mode is stored in Redux state

const BlockchainModeBanner = () => {
    const settings = useSelector((state) => state.settings.settings);

    const blockchainMode = settings.blockchain_mode;

    // Only show the banner if the mode is not mainnet
    if (blockchainMode === 'mainnet') return null;

    const modeDisplay = blockchainMode === 'testnet' ? 'Testnet' : blockchainMode === 'devnet' ? 'Devnet' : 'Localnet';

    return (
        <div className="bg-yellow-300 text-yellow-800 text-center py-2">
            <p>
                You are currently viewing the platform on <strong>{modeDisplay}</strong>. Transactions and data are for testing purposes only.
            </p>
        </div>
    );
};

export default BlockchainModeBanner;
