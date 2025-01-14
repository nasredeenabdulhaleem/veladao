import React, { useEffect, useState } from 'react';

const WalletConnection = () => {
    const [walletConnected, setWalletConnected] = useState(false);

    useEffect(() => {
        if (window.solana) {
            window.solana.connect({ onlyIfTrusted: true })
                .then(({ publicKey }) => {
                    console.log('Connected with public key:', publicKey.toString());
                    setWalletConnected(true);
                })
                .catch((err) => {
                    console.error('Wallet connection error:', err);
                });
        }
    }, []);

    const connectWallet = async () => {
        if (window.solana) {
            try {
                const { publicKey } = await window.solana.connect();
                console.log('Connected with public key:', publicKey.toString());
                setWalletConnected(true);
            } catch (err) {
                console.error('Wallet connection error:', err);
            }
        } else {
            alert('Please install a Solana wallet extension.');
        }
    };

    return (
        <div>
            {walletConnected ? (
                <p>Wallet connected!</p>
            ) : (
                <button onClick={connectWallet}>
                    Connect Wallet
                </button>
            )}
        </div>
    );
};

export default WalletConnection;