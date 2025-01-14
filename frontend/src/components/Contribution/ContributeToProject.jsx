// import { Buffer } from 'buffer';
// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faWallet, faSpinner, faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
// import { toast } from 'react-toastify';
// import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
// import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';

// // Sample recipient public key for the project (to be passed as prop or fetched dynamically)
// const PROJECT_PUBLIC_KEY = "YourProjectPublicKeyHere";

// // USDC and USDT mint addresses on the Solana mainnet
// const USDC_MINT = new PublicKey('Es9vMFrzaCERgXTJhA1SK8taqWhQpCv1M4cfKtjXY4A');
// const USDT_MINT = new PublicKey('BXTWBYFPyd9LkmWtXAVhCjN6gFgq3LZAnLqTjptbW45p');

// // const USDC_MINT = new PublicKey('YourUSDCMintAddress');
// // const USDT_MINT = new PublicKey('YourUSDTMintAddress');

// // Initialize Solana Connection
// // const connection = new Connection("https://api.mainnet-beta.solana.com");
// const connection = new Connection("https://api.devnet.solana.com");
// // const connection = new Connection("http://localhost:8899");


// const ContributeToProject = ({ projectPublicKey = PROJECT_PUBLIC_KEY }) => {
//     const [amount, setAmount] = useState('');
//     const [cryptoType, setCryptoType] = useState('SOL');
//     const [walletAddress, setWalletAddress] = useState(null);
//     const [isWalletConnected, setIsWalletConnected] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isTransactionSuccess, setIsTransactionSuccess] = useState(false);

//     // Function to connect to a Solana wallet
//     const connectWallet = async () => {
//         if (window.solana) {
//             try {
//                 const resp = await window.solana.connect();
//                 setWalletAddress(resp.publicKey.toString());
//                 setIsWalletConnected(true);
//                 toast.success('Wallet connected!');
//             } catch (err) {
//                 if (err.message.includes('disconnected')) {
//                     // Attempt to reconnect or notify the user to reconnect
//                     disconnectWallet();
//                 }
//                 console.error('Wallet connection failed', err);
//                 toast.error('Failed to connect wallet.');
//             }
//         } else {
//             toast.error('Please install a Solana wallet extension.');
//         }
//     };
//     // Function to disconnect the wallet
//     const disconnectWallet = async () => {
//         if (window.solana && window.solana.isPhantom) {
//             await window.solana.disconnect();
//             setIsWalletConnected(false);
//             toast.info('Wallet disconnected. Please reconnect.');
//         }
//     };


//     // Function to handle SOL contributions
//     const handleSOLContribution = async (projectKey, walletKey) => {
//         const transaction = new Transaction().add(
//             SystemProgram.transfer({
//                 fromPubkey: walletKey,
//                 toPubkey: projectKey,
//                 lamports: amount * 1e9, // Convert SOL to lamports
//             })
//         );
//         // Fetch recent blockhash and set it in the transaction
//         const { blockhash } = await connection.getLatestBlockhash();
//         transaction.recentBlockhash = blockhash;
//         transaction.feePayer = walletKey;
//         return await window.solana.signAndSendTransaction(transaction);
//     };

//     // Function to handle USDC/USDT contributions
//     const handleTokenContribution = async (projectKey, walletKey, tokenMint) => {
//         const fromTokenAccount = await getAssociatedTokenAddress(tokenMint, walletKey);
//         const toTokenAccount = await getAssociatedTokenAddress(tokenMint, projectKey);

//         const transaction = new Transaction().add(
//             createTransferInstruction(
//                 fromTokenAccount, // Source account
//                 toTokenAccount, // Destination account
//                 walletKey, // Owner of the source account
//                 amount * 1e6 // Amount in token smallest units (e.g., 1 USDC = 1e6)
//             )
//         );
//         // Fetch recent blockhash and set it in the transaction
//         const { blockhash } = await connection.getLatestBlockhash();
//         transaction.recentBlockhash = blockhash;
//         transaction.feePayer = walletKey;

//         return await window.solana.signAndSendTransaction(transaction);
//     };

//     // Function to handle the contribution
//     const handleContribution = async () => {
//         if (!isWalletConnected) {
//             toast.error('Please connect your wallet.');
//             return;
//         }

//         if (!amount || isNaN(amount) || amount <= 0) {
//             toast.error('Please enter a valid amount.');
//             return;
//         }

//         try {
//             setIsLoading(true);
//             const projectKey = new PublicKey(projectPublicKey);
//             const walletKey = new PublicKey(walletAddress);

//             let signature;
//             if (cryptoType === 'SOL') {
//                 // Handle SOL contribution
//                 signature = await handleSOLContribution(projectKey, walletKey);
//             } else {
//                 // Handle USDC/USDT contribution
//                 const tokenMint = cryptoType === 'USDC' ? USDC_MINT : USDT_MINT;
//                 signature = await handleTokenContribution(projectKey, walletKey, tokenMint);
//             }

//             toast.success(`Transaction successful! Signature: ${signature.signature}`);
//             console.log('Transaction successful:', signature);
//             setIsTransactionSuccess(true);
//         } catch (error) {
//             console.error('Contribution failed', error);
//             if (error.message.includes('User rejected the request')) {
//                 toast.error('Transaction rejected by the user.');
//             }
//             if (error.message.includes('insufficient')) {
//                 toast.error('Insufficient funds for this transaction.');
//             } else {
//                 toast.error('Contribution failed. Please try again.');
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="container mx-auto">
//             {/* Button to open contribution modal */}
//             <button
//                 className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-700 focus:outline-none"
//                 onClick={() => setIsModalOpen(true)}
//             >
//                 Contribute to Project
//             </button>

//             {/* Modal for contribution */}
//             <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${isModalOpen ? '' : 'hidden'}`}>
//                 <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative">
//                     {/* Close Button */}
//                     <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
//                         <FontAwesomeIcon icon={faTimes} className="text-xl" />
//                     </button>

//                     <h2 className="text-2xl font-bold text-teal-600 mb-4">Contribute to Project</h2>

//                     {/* Amount Input */}
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-medium mb-2">Amount</label>
//                         <input
//                             type="number"
//                             value={amount}
//                             onChange={(e) => setAmount(e.target.value)}
//                             className="w-full p-2 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-teal-500"
//                             placeholder="Enter amount"
//                         />
//                     </div>

//                     {/* Crypto Type Selection */}
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-medium mb-2">Select Cryptocurrency</label>
//                         <select
//                             value={cryptoType}
//                             onChange={(e) => setCryptoType(e.target.value)}
//                             className="w-full p-2 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-teal-500"
//                         >
//                             <option value="SOL">Solana (SOL)</option>
//                             <option value="USDC">USD Coin (USDC)</option>
//                             <option value="USDT">Tether (USDT)</option>
//                         </select>
//                     </div>

//                     {/* Wallet Connection or Contribute */}
//                     <button
//                         onClick={isWalletConnected ? handleContribution : connectWallet}
//                         className="bg-teal-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-teal-700 focus:outline-none"
//                         disabled={isLoading}
//                     >
//                         {isLoading ? (
//                             <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
//                         ) : isWalletConnected ? (
//                             `Contribute ${amount} ${cryptoType}`
//                         ) : (
//                             'Connect Wallet'
//                         )}
//                     </button>

//                     {/* Success message */}
//                     {isTransactionSuccess && (
//                         <div className="mt-4 text-green-600">
//                             <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
//                             Contribution successful!
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ContributeToProject;


// import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faWallet, faSpinner, faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
// import { toast } from 'react-toastify';
// import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
// import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';
// import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';

// // Sample recipient public key for the project (to be passed as prop or fetched dynamically)
// const PROJECT_PUBLIC_KEY = "YourProjectPublicKeyHere";

// // USDC and USDT mint addresses on the Solana mainnet
// const USDC_MINT = new PublicKey('Es9vMFrzaCERgXTJhA1SK8taqWhQpCv1M4cfKtjXY4A');
// const USDT_MINT = new PublicKey('BXTWBYFPyd9LkmWtXAVhCjN6gFgq3LZAnLqTjptbW45p');

// // Initialize Solana Connection
// const connection = new Connection("https://api.devnet.solana.com");

// const ContributeToProject = ({ projectPublicKey = PROJECT_PUBLIC_KEY }) => {
//     const [amount, setAmount] = useState('');
//     const [cryptoType, setCryptoType] = useState('SOL');
//     const [walletAddress, setWalletAddress] = useState(null);
//     const [isWalletConnected, setIsWalletConnected] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isTransactionSuccess, setIsTransactionSuccess] = useState(false);

//     // Initialize Solflare wallet adapter
//     const solflare = new SolflareWalletAdapter();

//     // Function to connect to a Solana wallet
//     // const connectWallet = async () => {
//     //     try {
//     //         if (solflare.isConnected) {
//     //             await solflare.connect();
//     //             setWalletAddress(solflare.publicKey.toString());
//     //             setIsWalletConnected(true);
//     //             toast.success('Wallet connected!');
//     //         } else if (window.solana) {
//     //             const resp = await window.solana.connect();
//     //             setWalletAddress(resp.publicKey.toString());
//     //             setIsWalletConnected(true);
//     //             toast.success('Wallet connected!');
//     //         } else {
//     //             toast.error('Please install a Solana wallet extension.');
//     //         }
//     //     } catch (err) {
//     //         if (err.message.includes('disconnected')) {
//     //             // Attempt to reconnect or notify the user to reconnect
//     //             disconnectWallet();
//     //         }
//     //         console.error('Wallet connection failed', err);
//     //         toast.error('Failed to connect wallet.');
//     //     }
//     // };
//     const connectWallet = async () => {
//         try {
//             if (window.solflare && window.solflare.isSolflare) {
//                 await window.solflare.connect();
//                 const publicKey = window.solflare.publicKey;
//                 if (publicKey) {
//                     setWalletAddress(publicKey.toString());
//                     setIsWalletConnected(true);
//                     toast.success('Solflare wallet connected!');
//                 } else {
//                     throw new Error('Failed to get public key from Solflare');
//                 }
//             } else if (window.solana && window.solana.isPhantom) {
//                 const resp = await window.solana.connect();
//                 setWalletAddress(resp.publicKey.toString());
//                 setIsWalletConnected(true);
//                 toast.success('Phantom wallet connected!');
//             } else {
//                 toast.error('Please install Solflare or Phantom wallet extension.');
//             }
//         } catch (err) {
//             console.error('Wallet connection failed', err);
//             if (err.name === 'WalletConnectionError') {
//                 toast.error('Connection request rejected. Please try again.');
//             } else if (err.message.includes('disconnected')) {
//                 disconnectWallet();
//                 toast.error('Wallet disconnected. Please reconnect.');
//             } else {
//                 toast.error(`Failed to connect wallet: ${err.message}`);
//             }
//         }
//     };
//     // Function to disconnect the wallet
//     const disconnectWallet = async () => {
//         try {
//             if (solflare.isConnected) {
//                 await solflare.disconnect();
//                 setIsWalletConnected(false);
//                 toast.info('Wallet disconnected. Please reconnect.');
//             } else if (window.solana && window.solana.isPhantom) {
//                 await window.solana.disconnect();
//                 setIsWalletConnected(false);
//                 toast.info('Wallet disconnected. Please reconnect.');
//             }
//         } catch (err) {
//             console.error('Wallet disconnection failed', err);
//             toast.error('Failed to disconnect wallet.');
//         }
//     };

//     // Function to handle SOL contributions
//     const handleSOLContribution = async (projectKey, walletKey) => {
//         const transaction = new Transaction().add(
//             SystemProgram.transfer({
//                 fromPubkey: walletKey,
//                 toPubkey: projectKey,
//                 lamports: amount * 1e9, // Convert SOL to lamports
//             })
//         );
//         // Fetch recent blockhash and set it in the transaction
//         const { blockhash } = await connection.getLatestBlockhash();
//         transaction.recentBlockhash = blockhash;
//         transaction.feePayer = walletKey;

//         if (solflare.isConnected) {

//             // return await solflare.signAndSendTransaction(transaction);
//             return await solflare.requestWithModal(transaction);
//         } else if (window.solana) {
//             return await window.solana.signAndSendTransaction(transaction);
//         }
//         return await window.solana.signAndSendTransaction(transaction);
//     };

//     // Function to handle USDC/USDT contributions
//     const handleTokenContribution = async (projectKey, walletKey, tokenMint) => {
//         const fromTokenAccount = await getAssociatedTokenAddress(tokenMint, walletKey);
//         const toTokenAccount = await getAssociatedTokenAddress(tokenMint, projectKey);

//         const transaction = new Transaction().add(
//             createTransferInstruction(
//                 fromTokenAccount, // Source account
//                 toTokenAccount, // Destination account
//                 walletKey, // Owner of the source account
//                 amount * 1e6 // Amount in token smallest units (e.g., 1 USDC = 1e6)
//             )
//         );
//         // Fetch recent blockhash and set it in the transaction
//         const { blockhash } = await connection.getLatestBlockhash();
//         transaction.recentBlockhash = blockhash;
//         transaction.feePayer = walletKey;

//         if (solflare.isConnected) {
//             return await solflare.signAndSendTransaction(transaction);
//         } else if (window.solana) {
//             return await window.solana.signAndSendTransaction(transaction);
//         }
//     };

//     // Function to handle the contribution
//     const handleContribution = async () => {
//         if (!isWalletConnected) {
//             toast.error('Please connect your wallet.');
//             return;
//         }

//         if (!amount || isNaN(amount) || amount <= 0) {
//             toast.error('Please enter a valid amount.');
//             return;
//         }

//         try {
//             setIsLoading(true);
//             const projectKey = new PublicKey(projectPublicKey);
//             const walletKey = new PublicKey(walletAddress);

//             let signature;
//             if (cryptoType === 'SOL') {
//                 // Handle SOL contribution
//                 signature = await handleSOLContribution(projectKey, walletKey);
//             } else {
//                 // Handle USDC/USDT contribution
//                 const tokenMint = cryptoType === 'USDC' ? USDC_MINT : USDT_MINT;
//                 signature = await handleTokenContribution(projectKey, walletKey, tokenMint);
//             }

//             toast.success(`Transaction successful! Signature: ${signature.signature}`);
//             console.log('Transaction successful:', signature);
//             setIsTransactionSuccess(true);
//         } catch (error) {
//             console.error('Contribution failed', error);
//             if (error.message.includes('User rejected the request')) {
//                 toast.error('Transaction rejected by the user.');
//             }
//             if (error.message.includes('insufficient')) {
//                 toast.error('Insufficient funds for this transaction.');
//             } else {
//                 toast.error('Contribution failed. Please try again.');
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="container mx-auto">
//             {/* Button to open contribution modal */}
//             <button
//                 className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-700 focus:outline-none"
//                 onClick={() => setIsModalOpen(true)}
//             >
//                 Contribute to Project
//             </button>

//             {/* Modal for contribution */}
//             <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${isModalOpen ? '' : 'hidden'}`}>
//                 <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative">
//                     {/* Close Button */}
//                     <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
//                         <FontAwesomeIcon icon={faTimes} className="text-xl" />
//                     </button>

//                     <h2 className="text-2xl font-bold text-teal-600 mb-4">Contribute to Project</h2>

//                     {/* Amount Input */}
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-medium mb-2">Amount</label>
//                         <input
//                             type="number"
//                             value={amount}
//                             onChange={(e) => setAmount(e.target.value)}
//                             className="w-full p-2 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-teal-500"
//                             placeholder="Enter amount"
//                         />
//                     </div>

//                     {/* Crypto Type Selection */}
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-medium mb-2">Select Cryptocurrency</label>
//                         <select
//                             value={cryptoType}
//                             onChange={(e) => setCryptoType(e.target.value)}
//                             className="w-full p-2 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-teal-500"
//                         >
//                             <option value="SOL">Solana (SOL)</option>
//                             <option value="USDC">USD Coin (USDC)</option>
//                             <option value="USDT">Tether (USDT)</option>
//                         </select>
//                     </div>

//                     {/* Wallet Connection or Contribute */}
//                     <button
//                         onClick={isWalletConnected ? handleContribution : connectWallet}
//                         className="bg-teal-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-teal-700 focus:outline-none"
//                         disabled={isLoading}
//                     >
//                         {isLoading ? (
//                             <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
//                         ) : isWalletConnected ? (
//                             `Contribute ${amount} ${cryptoType}`
//                         ) : (
//                             'Connect Wallet'
//                         )}
//                     </button>

//                     {/* Success message */}
//                     {isTransactionSuccess && (
//                         <div className="mt-4 text-green-600">
//                             <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
//                             Contribution successful!
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ContributeToProject;



// import { useState, useCallback } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faWallet, faSpinner, faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
// import { toast } from 'react-toastify';
// import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
// import { getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';

// // Sample recipient public key for the project (to be passed as prop or fetched dynamically)
// const PROJECT_PUBLIC_KEY = "ChYwGMcLJttU74D2wD7cwfhjsH7WM7XYbFQFMxa5rZwf";

// // USDC mint address on the Solana mainnet
// const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');

// // Initialize Solana Connection (using devnet for this example)
// const connection = new Connection("https://api.devnet.solana.com");

// const ContributeToProject = ({ projectPublicKey = "ChYwGMcLJttU74D2wD7cwfhjsH7WM7XYbFQFMxa5rZwf" }) => {
//     const [amount, setAmount] = useState('');
//     const [cryptoType, setCryptoType] = useState('SOL');
//     const [walletAddress, setWalletAddress] = useState(null);
//     const [isWalletConnected, setIsWalletConnected] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isTransactionSuccess, setIsTransactionSuccess] = useState(false);
//     const [wallet, setWallet] = useState(null);

//     const connectWallet = async () => {
//         try {
//             if (window.solflare && window.solflare.isSolflare) {
//                 await window.solflare.connect();
//                 setWallet(window.solflare);
//                 toast.success("solflare Wallet Connected")
//             } else if (window.solana && window.solana.isPhantom) {
//                 await window.solana.connect();
//                 setWallet(window.solana);
//             } else {
//                 throw new Error('No compatible wallet found');
//             }

//             const publicKey = wallet.publicKey;
//             if (publicKey) {
//                 setWalletAddress(publicKey.toString());
//                 setIsWalletConnected(true);
//                 toast.success('Wallet connected!');
//             } else {
//                 throw new Error('Failed to get public key from wallet');
//             }
//         } catch (err) {
//             console.error('Wallet connection failed', err);
//             toast.error(`Failed to connect wallet: ${err.message}`);
//         }
//     };

//     const disconnectWallet = async () => {
//         try {
//             if (wallet) {
//                 await wallet.disconnect();
//                 setIsWalletConnected(false);
//                 setWalletAddress(null);
//                 setWallet(null);
//                 toast.info('Wallet disconnected.');
//             }
//         } catch (err) {
//             console.error('Wallet disconnection failed', err);
//             toast.error('Failed to disconnect wallet.');
//         }
//     };

//     const handleContribution = async () => {
//         if (!isWalletConnected) {
//             toast.error('Please connect your wallet.');
//             return;
//         }

//         if (!amount || isNaN(amount) || amount <= 0) {
//             toast.error('Please enter a valid amount.');
//             return;
//         }

//         try {
//             setIsLoading(true);
//             const projectKey = new PublicKey(projectPublicKey);
//             const walletKey = new PublicKey(walletAddress);

//             let transaction = new Transaction();
//             if (cryptoType === 'SOL') {
//                 transaction.add(
//                     SystemProgram.transfer({
//                         fromPubkey: walletKey,
//                         toPubkey: projectKey,
//                         lamports: amount * 1e9, // Convert SOL to lamports
//                     })
//                 );
//             } else if (cryptoType === 'USDC') {
//                 const fromTokenAccount = await getAssociatedTokenAddress(USDC_MINT, walletKey);
//                 const toTokenAccount = await getAssociatedTokenAddress(USDC_MINT, projectKey);
//                 transaction.add(
//                     createTransferInstruction(
//                         fromTokenAccount,
//                         toTokenAccount,
//                         walletKey,
//                         amount * 1e6 // USDC has 6 decimal places
//                     )
//                 );
//             } else {
//                 throw new Error('Unsupported crypto type');
//             }

//             const { blockhash } = await connection.getLatestBlockhash();
//             transaction.recentBlockhash = blockhash;
//             transaction.feePayer = walletKey;

//             let signature;
//             if (wallet.isSolflare) {
//                 signature = await wallet.requestWithModal(transaction);
//             } else {
//                 signature = await wallet.signAndSendTransaction(transaction);
//             }

//             toast.success(`Transaction successful! Signature: ${signature.signature || signature}`);
//             console.log('Transaction successful:', signature);
//             setIsTransactionSuccess(true);
//         } catch (error) {
//             console.error('Contribution failed', error);
//             if (error.message.includes('User rejected')) {
//                 toast.error('Transaction rejected by the user.');
//             } else if (error.message.includes('insufficient')) {
//                 toast.error('Insufficient funds for this transaction.');
//             } else {
//                 toast.error('Contribution failed. Please try again.');
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="container mx-auto">
//             <button
//                 className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-700 focus:outline-none"
//                 onClick={() => setIsModalOpen(true)}
//             >
//                 Contribute to Project
//             </button>

//             <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${isModalOpen ? '' : 'hidden'}`}>
//                 <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative">
//                     <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
//                         <FontAwesomeIcon icon={faTimes} className="text-xl" />
//                     </button>

//                     <h2 className="text-2xl font-bold text-teal-600 mb-4">Contribute to Project</h2>

//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-medium mb-2">Amount</label>
//                         <input
//                             type="number"
//                             value={amount}
//                             onChange={(e) => setAmount(e.target.value)}
//                             className="w-full p-2 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-teal-500"
//                             placeholder="Enter amount"
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-medium mb-2">Select Cryptocurrency</label>
//                         <select
//                             value={cryptoType}
//                             onChange={(e) => setCryptoType(e.target.value)}
//                             className="w-full p-2 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-teal-500"
//                         >
//                             <option value="SOL">Solana (SOL)</option>
//                             <option value="USDC">USD Coin (USDC)</option>
//                         </select>
//                     </div>

//                     <button
//                         onClick={isWalletConnected ? handleContribution : connectWallet}
//                         className="bg-teal-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-teal-700 focus:outline-none"
//                         disabled={isLoading}
//                     >
//                         {isLoading ? (
//                             <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
//                         ) : isWalletConnected ? (
//                             `Contribute ${amount} ${cryptoType}`
//                         ) : (
//                             'Connect Wallet'
//                         )}
//                     </button>

//                     {isTransactionSuccess && (
//                         <div className="mt-4 text-green-600">
//                             <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
//                             Contribution successful!
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ContributeToProject;


import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faSpinner, faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';

// Sample recipient public key for the project (to be passed as prop or fetched dynamically)
const PROJECT_PUBLIC_KEY = "FaWdqQKDnnwageoxYEizU97cuMNDmH7hsP9AbLoEUAbn";

// USDC mint address on the Solana mainnet
const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');

// Initialize Solana Connection (using devnet for this example)
const connection = new Connection("https://api.devnet.solana.com");

const ContributeToProject = ({ projectPublicKey = PROJECT_PUBLIC_KEY }) => {
    const [amount, setAmount] = useState('');
    const [cryptoType, setCryptoType] = useState('SOL');
    const [walletAddress, setWalletAddress] = useState(null);
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTransactionSuccess, setIsTransactionSuccess] = useState(false);
    const [wallet, setWallet] = useState(null);

    const connectWallet = async () => {
        try {
            let selectedWallet = null;
            if (window.solflare && window.solflare.isSolflare) {
                await window.solflare.connect();
                selectedWallet = window.solflare;
            } else if (window.solana && window.solana.isPhantom) {
                await window.solana.connect();
                selectedWallet = window.solana;
            } else {
                throw new Error('No compatible wallet found');
            }

            setWallet(selectedWallet);

            if (selectedWallet.publicKey) {
                setWalletAddress(selectedWallet.publicKey.toString());
                setIsWalletConnected(true);
                toast.success('Wallet connected!');
            } else {
                throw new Error('Failed to get public key from wallet');
            }
        } catch (err) {
            console.error('Wallet connection failed', err);
            toast.error(`Failed to connect wallet: ${err.message}`);
        }
    };

    const disconnectWallet = async () => {
        try {
            if (wallet) {
                await wallet.disconnect();
                setIsWalletConnected(false);
                setWalletAddress(null);
                setWallet(null);
                toast.info('Wallet disconnected.');
            }
        } catch (err) {
            console.error('Wallet disconnection failed', err);
            toast.error('Failed to disconnect wallet.');
        }
    };

    const handleContribution = async () => {
        if (!isWalletConnected || !wallet) {
            toast.error('Please connect your wallet.');
            return;
        }

        if (!amount || isNaN(amount) || amount <= 0) {
            toast.error('Please enter a valid amount.');
            return;
        }

        try {
            setIsLoading(true);
            const projectKey = new PublicKey(projectPublicKey);
            const walletKey = wallet.publicKey;

            let transaction = new Transaction();
            if (cryptoType === 'SOL') {
                transaction.add(
                    SystemProgram.transfer({
                        fromPubkey: walletKey,
                        toPubkey: projectKey,
                        lamports: Math.floor(amount * 1e9), // Convert SOL to lamports
                    })
                );
            } else if (cryptoType === 'USDC') {
                const fromTokenAccount = await getAssociatedTokenAddress(USDC_MINT, walletKey);
                const toTokenAccount = await getAssociatedTokenAddress(USDC_MINT, projectKey);
                transaction.add(
                    createTransferInstruction(
                        fromTokenAccount,
                        toTokenAccount,
                        walletKey,
                        Math.floor(amount * 1e6) // USDC has 6 decimal places
                    )
                );
            } else {
                throw new Error('Unsupported crypto type');
            }

            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = walletKey;

            let signature;
            if (wallet.isSolflare && typeof wallet.requestWithModal === 'function') {
                signature = await wallet.requestWithModal(transaction);
            } else {
                signature = await wallet.signAndSendTransaction(transaction);
            }

            const result = (typeof signature === 'object' && signature.signature) ? signature.signature : signature;

            toast.success(`Transaction successful! Signature: ${result}`);
            console.log('Transaction successful:', result);
            setIsTransactionSuccess(true);
        } catch (error) {
            console.error('Contribution failed', error);
            if (error.message.includes('User rejected')) {
                toast.error('Transaction rejected by the user.');
            } else if (error.message.includes('insufficient')) {
                toast.error('Insufficient funds for this transaction.');
            } else {
                toast.error(`Contribution failed: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto">
            <button
                className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-700 focus:outline-none"
                onClick={() => setIsModalOpen(true)}
            >
                Contribute to Project
            </button>

            <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${isModalOpen ? '' : 'hidden'}`}>
                <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative">
                    <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
                        <FontAwesomeIcon icon={faTimes} className="text-xl" />
                    </button>

                    <h2 className="text-2xl font-bold text-teal-600 mb-4">Contribute to Project</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-teal-500"
                            placeholder="Enter amount"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Select Cryptocurrency</label>
                        <select
                            value={cryptoType}
                            onChange={(e) => setCryptoType(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-teal-500"
                        >
                            <option value="SOL">Solana (SOL)</option>
                            <option value="USDC">USD Coin (USDC)</option>
                        </select>
                    </div>

                    <button
                        onClick={isWalletConnected ? handleContribution : connectWallet}
                        className="bg-teal-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-teal-700 focus:outline-none"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                        ) : isWalletConnected ? (
                            `Contribute ${amount} ${cryptoType}`
                        ) : (
                            'Connect Wallet'
                        )}
                    </button>

                    {isTransactionSuccess && (
                        <div className="mt-4 text-green-600">
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                            Contribution successful!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContributeToProject;